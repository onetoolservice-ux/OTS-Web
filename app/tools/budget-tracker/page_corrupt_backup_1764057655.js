"use client";
import React, { useState, useEffect, useMemo } from "react";

function uid() {
return Math.random().toString(36).slice(2,9);
}

const DEFAULT_CAT_GROUPS = {
"Income":["Salary","Interest","Gift"],
"Expense":["Food","Transport","Shopping","Bills","Rent","Entertainment"],
"Transfer":["Wallet","Bank"]
};

function currencyFormat(v, symbol="₹") {
return symbol + (Number(v)||0).toLocaleString();
}

export default function BudgetTracker(){
const [txDate,setTxDate]=useState(()=>{
let d=new Date();return d.toISOString().slice(0,10);
});
const [txType,setTxType]=useState("Expense");
const [catGroup,setCatGroup]=useState("Expense");
const [category,setCategory]=useState(DEFAULT_CAT_GROUPS["Expense"][0]);
const [desc,setDesc]=useState("");
const [amount,setAmount]=useState("");
const [account,setAccount]=useState("Cash");
const [symbol,setSymbol]=useState("₹");
const [data,setData]=useState(()=>{
try{
const raw=localStorage.getItem("ots_budget_tx");
return raw?JSON.parse(raw):[];
}catch(e){
return [];
}
});
const [monthFilter,setMonthFilter]=useState(new Date().getMonth()+1);
const [yearFilter,setYearFilter]=useState(new Date().getFullYear());
useEffect(()=>{
localStorage.setItem("ots_budget_tx",JSON.stringify(data));
},[data]);

const categories = useMemo(()=>DEFAULT_CAT_GROUPS[catGroup]||[],[catGroup]);

useEffect(()=>{
if(!categories.includes(category)){
setCategory(categories[0]||"");
}
},[catGroup]);

function clearInputs(){
setTxDate(new Date().toISOString().slice(0,10));
setTxType("Expense");
setCatGroup("Expense");
setCategory(DEFAULT_CAT_GROUPS["Expense"][0]);
setDesc("");
setAmount("");
setAccount("Cash");
setSymbol("₹");
}

function addTransaction(e){
e&&e.preventDefault();
if(!amount || Number(amount)===0) return alert("Enter a valid amount");
const item={
id: uid(),
date: txDate,
type: txType,
group: catGroup,
category: category,
description: desc,
amount: Number(amount),
account: account,
symbol: symbol
};
setData(prev=>[item,...prev]);
clearInputs();
}

function deleteTx(id){
if(!confirm("Delete this transaction?")) return;
setData(prev=>prev.filter(x=>x.id!==id));
}

const filtered = useMemo(()=>{
return data.filter(d=>{
const dt = new Date(d.date);
return (dt.getMonth()+1)===Number(monthFilter) && dt.getFullYear()===Number(yearFilter);
});
},[data,monthFilter,yearFilter]);

const totals = useMemo(()=>{
let inc=0,exp=0;
filtered.forEach(i=>{
if(i.type==="Income") inc += Number(i.amount||0);
else if(i.type==="Expense") exp += Number(i.amount||0);
});
return {income:inc,expense:exp,net:inc-exp};
},[filtered]);

const categoryTotals = useMemo(()=>{
const map={};
filtered.forEach(i=>{
const key = i.group + "||" + i.category;
map[key] = (map[key]||0) + Number(i.amount||0);
});
const arr=Object.keys(map).map(k=>{
const [g,c]=k.split("||");
return {group:g,category:c,value:map[k]};
});
arr.sort((a,b)=>b.value-a.value);
return arr;
},[filtered]);

const monthOptions = Array.from({length:12},(_,i)=>i+1);
const yearOptions = Array.from({length:6},(_,i)=>new Date().getFullYear()-i);

return (
<div className="min-h-screen bg-white text-gray-900">
<header className="border-b sticky top-0 bg-white z-10">
<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-md flex items-center justify-center text-white font-bold">OT</div>
<div>
<div className="text-sm font-semibold">One Tool — Budget Tracker</div>
<div className="text-xs text-gray-500">Local Mode • Data stored in browser</div>
</div>
</div>
<nav className="text-sm text-gray-600">
<a className="px-3">Home</a>
<a className="px-3">Tools</a>
<a className="px-3">About</a>
</nav>
</div>
</header>

<main className="max-w-5xl mx-auto px-4 py-8">

{/* HERO */}
<section className="mb-6">
<div className="bg-gradient-to-r from-white to-white/95 p-6 rounded-2xl shadow-sm border">
<h1 className="text-2xl font-extrabold text-blue-800">Monthly Budget Tracker</h1>
<p className="text-sm text-gray-600 mt-1">Smart, local-first tool to track income, expenses and balances. Data stored on your browser.</p>
</div>
</section>

{/* GRID */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">

{/* LEFT: Add Transaction (spans 2 cols on md) */}
<div className="md:col-span-1 bg-white border rounded-xl p-4 shadow-sm">
<h3 className="text-lg font-semibold text-blue-700 mb-3">Add Transaction</h3>
<form onSubmit={addTransaction} className="space-y-3">

<div className="grid grid-cols-2 gap-2">
<div>
<label className="text-xs text-gray-500">Date</label>
<input type="date" value={txDate} onChange={e=>setTxDate(e.target.value)} className="w-full mt-1 p-2 rounded-lg border"/>
</div>
<div>
<label className="text-xs text-gray-500">Type</label>
<select value={txType} onChange={e=>{setTxType(e.target.value); setCatGroup(e.target.value);}} className="w-full mt-1 p-2 rounded-lg border">
<option>Expense</option>
<option>Income</option>
<option>Transfer</option>
</select>
</div>
</div>

<div>
<label className="text-xs text-gray-500">Category Group</label>
<select value={catGroup} onChange={e=>setCatGroup(e.target.value)} className="w-full mt-1 p-2 rounded-lg border">
{Object.keys(DEFAULT_CAT_GROUPS).map(k=> <option key={k}>{k}</option>)}
</select>
</div>

<div>
<label className="text-xs text-gray-500">Category</label>
<select value={category} onChange={e=>setCategory(e.target.value)} className="w-full mt-1 p-2 rounded-lg border">
{categories.map(c=><option key={c}>{c}</option>)}
</select>
</div>

<div>
<label className="text-xs text-gray-500">Description</label>
<input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Note or description" className="w-full mt-1 p-2 rounded-lg border"/>
</div>

<div className="grid grid-cols-3 gap-2">
<div>
<label className="text-xs text-gray-500">Amount</label>
<input value={amount} onChange={e=>setAmount(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full mt-1 p-2 rounded-lg border"/>
</div>
<div>
<label className="text-xs text-gray-500">Account</label>
<select value={account} onChange={e=>setAccount(e.target.value)} className="w-full mt-1 p-2 rounded-lg border">
<option>Cash</option>
<option>Bank</option>
<option>Credit Card</option>
<option>UPI/Wallet</option>
</select>
</div>
<div>
<label className="text-xs text-gray-500">Currency</label>
<input value={symbol} onChange={e=>setSymbol(e.target.value)} className="w-full mt-1 p-2 rounded-lg border"/>
</div>
</div>

<div className="flex gap-2 justify-end">
<button type="button" onClick={clearInputs} className="px-3 py-2 rounded-lg border text-sm">Clear</button>
<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:shadow-md">Add Transaction</button>
</div>

</form>
</div>

{/* RIGHT: Overview */}
<div className="md:col-span-2 bg-white border rounded-xl p-4 shadow-sm space-y-4">

{/* Filters & summary */}
<div className="flex items-center justify-between gap-4 flex-wrap">
<div className="flex items-center gap-3">
<label className="text-xs text-gray-500">Month</label>
<select value={monthFilter} onChange={e=>setMonthFilter(Number(e.target.value))} className="p-2 rounded-lg border">
{monthOptions.map(m=><option key={m} value={m}>{m.toString().padStart(2,"0")}</option>)}
</select>
<label className="text-xs text-gray-500">Year</label>
<select value={yearFilter} onChange={e=>setYearFilter(Number(e.target.value))} className="p-2 rounded-lg border">
{yearOptions.map(y=><option key={y} value={y}>{y}</option>)}
</select>
<button onClick={()=>{const d=new Date(); setMonthFilter(d.getMonth()+1); setYearFilter(d.getFullYear());}} className="px-3 py-2 rounded-lg border text-sm">This Month</button>
</div>

<div className="flex gap-3">
<div className="text-right">
<div className="text-xs text-gray-500">Income</div>
<div className="text-lg font-semibold text-green-600">{currencyFormat(totals.income,symbol)}</div>
</div>
<div className="text-right">
<div className="text-xs text-gray-500">Expense</div>
<div className="text-lg font-semibold text-red-600">{currencyFormat(totals.expense,symbol)}</div>
</div>
<div className="text-right">
<div className="text-xs text-gray-500">Net</div>
<div className="text-lg font-semibold text-yellow-600">{currencyFormat(totals.net,symbol)}</div>
</div>
</div>
</div>

{/* Chart + category breakdown */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-1 bg-white/0 p-2 flex items-center justify-center">
{/* Simple donut placeholder — lightweight SVG */}
<svg width="160" height="160" viewBox="0 0 42 42" className="rounded-full">
<circle cx="21" cy="21" r="15" fill="#f3f4f6"></circle>
{(function(){
const total = categoryTotals.reduce((s,x)=>s+x.value,0) || 1;
let acc=0; let idx=0;
return categoryTotals.slice(0,6).map((d,i)=>{
const part = d.value/total;
const start = acc; const end = acc+part;
acc += part;
const large = (end - start) > 0.5 ? 1 : 0;
const stroke = 30 * part;
const offset = 94 * start;
const colorList = ["#2563eb","#06b6d4","#7c3aed","#ef4444","#f59e0b","#10b981"];
const color=colorList[i%colorList.length];
const dash = `${stroke} 94`;
return <circle key={i} r="15" cx="21" cy="21" fill="transparent" stroke={color} strokeWidth="7" strokeDasharray={dash} strokeDashoffset={-offset} strokeLinecap="butt"></circle>;
});
})()}
<text x="21" y="22" textAnchor="middle" fontSize="5" fontWeight="700" fill="#0f172a">{currencyFormat(totals.net,symbol)}</text>
</svg>
</div>

<div className="md:col-span-2">
<h4 className="text-sm font-semibold text-gray-700 mb-2">Top Categories</h4>
<div className="space-y-2">
{categoryTotals.length===0 ? <div className="text-sm text-gray-400">No category data</div> : categoryTotals.map((c,i)=>
<div key={i} className="flex items-center justify-between p-2 border rounded-lg">
<div>
<div className="text-sm font-medium">{c.category} <span className="text-xs text-gray-500">({c.group})</span></div>
<div className="text-xs text-gray-500">{Math.round((c.value/(totals.expense||1))*100)}% of expense</div>
</div>
<div className="text-sm font-semibold text-blue-700">{currencyFormat(c.value,symbol)}</div>
</div>
)}
</div>
</div>
</div>

</div>
</section>

{/* Transactions table */}
<section className="mt-6">
<div className="bg-white border rounded-xl p-4 shadow-sm">
<h3 className="text-lg font-semibold text-blue-700 mb-3">Transactions ({filtered.length})</h3>

{filtered.length===0 ? <div className="text-gray-400">No transactions found for the selected month.</div> : (
<div className="overflow-x-auto">
<table className="w-full text-sm">
<thead className="sticky top-0 bg-white">
<tr>
<th className="text-left p-2">Date</th>
<th className="text-left p-2">Type</th>
<th className="text-left p-2">Category</th>
<th className="text-left p-2">Description</th>
<th className="text-right p-2">Amount</th>
<th className="text-left p-2">Account</th>
<th className="text-center p-2">Delete</th>
</tr>
</thead>
<tbody>
{filtered.map(item=>(
<tr key={item.id} className="border-t">
<td className="p-2">{item.date}</td>
<td className="p-2"><span className={"px-2 py-1 rounded-full text-xs "+(item.type==="Income"?"bg-green-100 text-green-700":"bg-red-100 text-red-700")}>{item.type}</span></td>
<td className="p-2">{item.group} / {item.category}</td>
<td className="p-2">{item.description}</td>
<td className="p-2 text-right font-semibold">{currencyFormat(item.amount,item.symbol)}</td>
<td className="p-2">{item.account}</td>
<td className="p-2 text-center"><button onClick={()=>deleteTx(item.id)} className="text-red-500">×</button></td>
</tr>
))}
</tbody>
</table>
</div>
)}

</div>
</section>

{/* Footer */}
<footer className="mt-8 text-center text-xs text-gray-500">
<div>© {new Date().getFullYear()} One Tool Solutions (OTS) • Local Mode</div>
</footer>

</main>
</div>
