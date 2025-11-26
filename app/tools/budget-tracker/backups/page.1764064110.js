"use client";
import React, { useEffect, useState, useRef } from "react";

const DEFAULT_CATEGORIES = {
"Personal": ["Groceries","Dining","Clothes","Health"],
"Transport": ["Fuel","Taxi","Public Transport"],
"Bills": ["Electricity","Water","Internet","Rent"],
"Income": ["Salary","Freelance","Interest"],
"Other": ["Gift","Misc"]
};

const DEFAULT_ACCOUNTS = ["Cash","Bank","Credit Card","UPI/Wallet"];

function uid(){
return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function formatMoney(n, currencySymbol="₹"){
const num = Number(n)||0;
return currencySymbol + num.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}

function readStorage(){
try{
const raw = localStorage.getItem("ots_budget_v1");
if(!raw) return null;
return JSON.parse(raw);
}catch(e){
console.error("storage parse error",e);
return null;
}
}

function writeStorage(data){
try{
localStorage.setItem("ots_budget_v1", JSON.stringify(data));
}catch(e){
console.error("storage write error",e);
}
}

export default function BudgetTracker(){
const [transactions, setTransactions] = useState([]);
const [form, setForm] = useState({
date: new Date().toISOString().slice(0,10),
type: "Expense",
group: "Personal",
category: "Groceries",
description: "",
amount: "",
account: DEFAULT_ACCOUNTS[0],
currency: "₹"
});
const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
const [accounts] = useState(DEFAULT_ACCOUNTS);
const [month, setMonth] = useState(new Date().getMonth()+1);
const [year, setYear] = useState(new Date().getFullYear());
const [toast, setToast] = useState("");
const fileInputRef = useRef(null);
const [filtered, setFiltered] = useState([]);
const [donutData, setDonutData] = useState([]);
const [modeLocal] = useState(true);
useEffect(()=>{
const d = readStorage();
if(d && Array.isArray(d.transactions)){
setTransactions(d.transactions);
}
},[]);
useEffect(()=>{
writeStorage({transactions});
},[transactions]);
useEffect(()=>{
filterByMonth();
},[transactions,month,year]);
function setToastMessage(msg,delay=2500){
    setToast(msg);
    setTimeout(()=>setToast(""),delay);
    }

    function handleFormChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setForm(prev=>({
    ...prev,
    [name]: value
    }));
    }

    function addTransaction(e){
    e && e.preventDefault();
    const amt = Number(form.amount);
    if(!form.date || !form.category || !form.amount || isNaN(amt)){
    setToastMessage("Please fill date, category and numeric amount");
    return;
    }
    const t = {
    id: uid(),
    date: form.date,
    type: form.type,
    group: form.group,
    category: form.category,
    description: form.description||"",
    amount: Number(amt),
    account: form.account,
    currency: form.currency||"₹"
    };
    setTransactions(prev=>[t,...prev]);
    setForm(prev=>({...prev,description:"",amount:""}));
    setToastMessage("Transaction added");
    }

    function deleteTransaction(id){
    setTransactions(prev=>prev.filter(p=>p.id!==id));
    setToastMessage("Deleted");
    }

    function clearAll(){
    if(confirm("Clear all transactions? This will remove local data.")){
    setTransactions([]);
    setToastMessage("All cleared");
    }
    }

    function filterByMonth(){
    const mm = Number(month)-1;
    const yy = Number(year);
    const f = transactions.filter(tx=>{
    const d = new Date(tx.date);
    return d.getMonth()===mm && d.getFullYear()===yy;
    });
    setFiltered(f);
    buildDonut(f);
    }

    function buildDonut(list){
    const map = {};
    list.forEach(tx=>{
    if(!map[tx.category]) map[tx.category]=0;
    map[tx.category]+= (tx.type==="Income"? tx.amount : tx.amount);
    });
    const arr = Object.keys(map).map(k=>({label:k,value:map[k]}));
    setDonutData(arr);
    }
}

function exportCSV(){
    if(transactions.length===0){
    setToastMessage("No data to export");
    return;
    }
    const header = ["id","date","type","group","category","description","amount","account","currency"];
    const rows = transactions.map(t=>header.map(h=> JSON.stringify(t[h]||"")).join(","));
    const csv = header.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ots_budget_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setToastMessage("CSV exported");
    }

    function importCSVFile(file){
    const reader = new FileReader();
    reader.onload = (ev)=>{
    try{
    const text = ev.target.result;
    const lines = text.split(/\r?\n/).filter(Boolean);
    if(lines.length<2) throw new Error("Invalid CSV");
    const header = lines[0].split(",").map(h=>h.replace(/(^"|"$)/g,""));
    const data = lines.slice(1).map(l=>{
    const cols = l.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const obj = {};
    cols.forEach((c,i)=> {
    let v = c.replace(/(^"|"$)/g,"");
    const key = header[i];
    if(key==="amount") v = Number(v);
    obj[key]=v;
    });
    if(!obj.id) obj.id = uid();
    return obj;
    });
    setTransactions(prev=>[...data,...prev]);
    setToastMessage("CSV imported");
    }catch(e){
    console.error(e);
    setToastMessage("CSV import failed");
    }
    };
    reader.readAsText(file);
    }

    function handleImportClick(){
    fileInputRef.current && fileInputRef.current.click();
    }

}