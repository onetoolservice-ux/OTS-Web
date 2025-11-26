"use client";
import Button from "@/components/budget/Button";
import Input from "@/components/budget/Input";
import Card from "@/components/budget/Card";
import Table from "@/components/budget/Table";
import Toast from "@/components/budget/Toast";
import { IconDownload, IconUpload } from "@/components/budget/Icon";
import { fmtMoney } from "@/lib/utils/formatter";
import { arrayToCSV, csvToRows } from "@/lib/utils/csv";

"use client";
import { useState, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { CATEGORY_GROUPS, ACCOUNT_TYPES, DEFAULT_CURRENCY } from "./config";

const [toastShow, setToastShow] = useState(false);
const [toastMessage, setToastMessage] = useState("");

export default function BudgetTracker() {

    const STORAGE_KEY = "oneToolBudgetData";
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        date: "",
        type: "",
        group: "",
        category: "",
        description: "",
        amount: "",
        account: "",
        currency: DEFAULT_CURRENCY
    });
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [chartInstance, setChartInstance] = useState(null);
function formatMoney(n) {
    return (form.currency || "₹") + Number(n).toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setTransactions(JSON.parse(raw));
            } catch {
                setTransactions([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function addTransaction(e) {
        e.preventDefault();
        if (!form.date || !form.type || !form.group || !form.category || !form.amount || !form.account) return;
        const newTx = { id: Date.now(), ...form, amount: Number(form.amount) };
        setTransactions([newTx, ...transactions]);
        setForm({ ...form, description: "", amount: "" });
    }

    function deleteTx(id) {
        setTransactions(transactions.filter(t => t.id !== id));
    }

    function clearAll() {
        if (confirm("Delete ALL records?")) setTransactions([]);
    }
    function importCSV(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const lines = evt.target.result.split("\n").slice(1);
            const imported = [];
            lines.forEach(l => {
                const [date, type, group, category, description, amount, account] = l.split(",");
                if (date) imported.push({
                    id: Date.now() + Math.random(),
                    date, type, group, category, description,
                    amount: Number(amount), account,
                    currency: form.currency
                });
            });
            setTransactions([...transactions, ...imported]);
        };
        reader.readAsText(file);

    }
    function exportCSV() {
        const rows = [["Date", "Type", "Group", "Category", "Description", "Amount", "Account"]];
        filtered.forEach(t => {
            rows.push([t.date, t.type, t.group, t.category, t.description, t.amount, t.account]);
        });
        let csv = rows.map(r => r.join(",")).join("\n");
        let blob = new Blob([csv], { type: "text/csv" });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "budget.csv";
        a.click();
        URL.revokeObjectURL(url);

    }
    const filtered = useMemo(() => {
        return transactions.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() + 1 === selectedMonth && d.getFullYear() === selectedYear;
        });
    }, [transactions, selectedMonth, selectedYear]);

    const summary = useMemo(() => {
        let income = 0, expense = 0;
        filtered.forEach(t => {
            if (t.type === "Income") income += t.amount;
            else if (t.type === "Expense") expense += t.amount;
        });
        return {
            income,
            expense,
            net: income - expense
        };
    }, [filtered]);

    useEffect(() => {
        if (!filtered.length) return;
        const expenseData = filtered.filter(t => t.type === "Expense");
        const totals = {};
        expenseData.forEach(t => {
            totals[t.category] = (totals[t.category] || 0) + t.amount;
        });
        const labels = Object.keys(totals);
        const values = Object.values(totals);
        if (chartInstance) chartInstance.destroy();
        const ctx = document.getElementById("expenseChart");
        const newChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#1e40af"]
                }]
            },
            options: {
                plugins: { legend: { position: "bottom" } }
            }
        });
        setChartInstance(newChart);
function formatMoney(n) {
    return (form.currency || "₹") + Number(n).toLocaleString(undefined, { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

    }, [filtered]);

