"use client";
import { useState, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { CATEGORY_GROUPS, ACCOUNT_TYPES, DEFAULT_CURRENCY } from "./config";

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
    }, [filtered]);

    function formatMoney(n) {
        return (form.currency || "₹") + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-700">One Tool — Budget Tracker</h1>
                        <p className="text-gray-600">Track income, expenses and monthly performance.</p>
                    </div>
                    <div className="px-3 py-1 text-sm rounded-full border bg-white shadow">
                        Mode: <strong>Local</strong>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-xl p-4 shadow">
                        <h2 className="font-semibold text-lg mb-2">Add Transaction</h2>
                        <form onSubmit={addTransaction} className="grid grid-cols-2 gap-3">

                            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded p-2 col-span-2" />

                            <select name="type" value={form.type} onChange={handleChange} className="border rounded p-2 col-span-1">
                                <option value="">Type</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                                <option value="Transfer">Transfer</option>
                            </select>

                            <select name="group" value={form.group} onChange={handleChange} className="border rounded p-2 col-span-1">
                                <option value="">Group</option>
                                {Object.keys(CATEGORY_GROUPS).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>

                            <select name="category" value={form.category} onChange={handleChange} className="border rounded p-2 col-span-2">
                                <option value="">Category</option>
                                {CATEGORY_GROUPS[form.group]?.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            <input type="text" name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border rounded p-2 col-span-2" />

                            <input type="number" name="amount" value={form.amount} placeholder="Amount" onChange={handleChange} className="border rounded p-2 col-span-1" />

                            <select name="account" value={form.account} onChange={handleChange} className="border rounded p-2 col-span-1">
                                <option value="">Account</option>
                                {ACCOUNT_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>

                            <input type="text" name="currency" value={form.currency} maxLength="3" onChange={handleChange} className="border rounded p-2 col-span-2" />

                            <button className="bg-blue-600 text-white rounded p-2 col-span-2">Add Transaction</button>
                        </form>
                        <button onClick={clearAll} className="mt-3 text-red-500 text-sm">Clear All</button>
<div class="flex gap-3 mt-4">
  <button onClick={() => window.print()} class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow">Export PDF</button>
  <button onClick={exportCSV} class="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-lg shadow-sm">Export CSV</button>
  <label class="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded-lg shadow-sm cursor-pointer">
    Import CSV
    <input type="file" accept=".csv" class="hidden" onChange={importCSV} />
  </label>
</div>
<div class="flex gap-6 mt-4">
    <label class="text-blue-600 text-sm underline cursor-pointer">
        <input type="file" accept=".csv" class="hidden" onChange={importCSV} />
    </label>
</div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="mt-3 ml-3 text-blue-600 text-sm underline"
                    >
                    </button>
                    <button
                        onClick={exportCSV}
                        className="mt-3 ml-3 text-blue-600 text-sm underline"
                    >
                    </button>
                    <label className="mt-3 ml-3 text-blue-600 text-sm underline cursor-pointer">
                        <input type="file" accept=".csv" className="hidden" onChange={importCSV} />
                    </label>
                    <div className="bg-white rounded-xl p-4 shadow">
                        <h2 className="font-semibold text-lg mb-3">Monthly Overview</h2>

                        <div className="flex gap-2 mb-3">
                            <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="border p-2 rounded">
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                            <input type="number" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border p-2 rounded" />
                            <button onClick={() => { setSelectedMonth(new Date().getMonth() + 1); setSelectedYear(new Date().getFullYear()); }} className="px-3 py-2 bg-gray-200 rounded">This Month</button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-green-100 rounded">
                                <p className="text-sm text-gray-600">Income</p>
                                <p className="text-green-700 font-bold text-xl">{formatMoney(summary.income)}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded">
                                <p className="text-sm text-gray-600">Expense</p>
               
                                <p className="text-red-700 font-bold text-xl">{formatMoney(summary.expense)}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded">
                                <p className="text-sm text-gray-600">Net</p>
                                <p className="text-blue-700 font-bold text-xl">{formatMoney(summary.net)}</p>
                            </div>
                        </div>

                        <canvas id="expenseChart" height="150" className="mt-4"></canvas>
                    </div>

                </div>

                <div className="bg-white rounded-xl p-4 shadow mt-6">
                    <h2 className="font-semibold text-lg mb-3">All Transactions</h2>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Group</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-right">Amount</th>
                                <th className="p-2">Account</th>
                                <th className="p-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(t => (
                                <tr key={t.id} className="border-b">
                                    <td className="p-2">{t.date}</td>
                                    <td className="p-2">{t.type}</td>
                                    <td className="p-2">{t.group}</td>
                                    <td className="p-2">{t.category}</td>
                                    <td className="p-2">{t.description}</td>
                                    <td className="p-2 text-right">{formatMoney(t.amount)}</td>
                                    <td className="p-2">{t.account}</td>
                                    <td className="p-2 text-center">
                                        <button onClick={() => deleteTx(t.id)} className="text-red-500">✕</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
