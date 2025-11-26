"use client";
import { useState, useEffect } from "react";

export default function BudgetTracker() {
    const [transactions, setTransactions] = useState([]);

    const [date, setDate] = useState("");
    const [type, setType] = useState("Income");
    const [categoryGroup, setCategoryGroup] = useState("General");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("Cash");
    const [currency, setCurrency] = useState("₹");

    const categoryMap = {
        General: ["Other"],
        Income: ["Salary", "Bonus", "Business", "Other"],
        Expenses: ["Food", "Travel", "Shopping", "Bills", "Rent", "Groceries", "Other"],
        Transfer: ["Bank Transfer", "UPI", "Wallet Transfer"]
    };

    const addTransaction = () => {
        if (!date || !category || !amount) {
            alert("Please fill all required fields.");
            return;
        }

        const newEntry = {
            date,
            type,
            categoryGroup,
            category,
            description,
            amount: Number(amount),
            account,
            currency
        };

        const updated = [...transactions, newEntry];
        setTransactions(updated);
        localStorage.setItem("ots-budget", JSON.stringify(updated));

        setAmount("");
        setDescription("");
    };

    useEffect(() => {
        const saved = localStorage.getItem("ots-budget");
        if (saved) setTransactions(JSON.parse(saved));
    }, []);

    const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((a, b) => a + b.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((a, b) => a + b.amount, 0);

    const netBalance = totalIncome - totalExpense;

    return (
        <main className="p-6 max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6 text-blue-300">
                Budget Tracker
            </h1>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* LEFT CARD */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-blue-200">
                        Add Transaction
                    </h2>

                    <div className="space-y-4">
                        <input
                            type="date"
                            className="w-full p-2 rounded bg-white/20"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <select
                            className="w-full p-2 rounded bg-white/20"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>Income</option>
                            <option>Expense</option>
                            <option>Transfer</option>
                        </select>

                        <select
                            className="w-full p-2 rounded bg-white/20"
                            value={categoryGroup}
                            onChange={(e) => setCategoryGroup(e.target.value)}
                        >
                            {Object.keys(categoryMap).map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            className="w-full p-2 rounded bg-white/20"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categoryMap[categoryGroup].map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <input
                            className="w-full p-2 rounded bg-white/20"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            className="w-full p-2 rounded bg-white/20"
                            placeholder="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <select
                            className="w-full p-2 rounded bg-white/20"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        >
                            <option>Cash</option>
                            <option>Bank</option>
                            <option>Credit Card</option>
                            <option>UPI/Wallet</option>
                        </select>

                        <button
                            onClick={addTransaction}
                            className="bg-blue-500 hover:bg-blue-600 transition w-full py-2 rounded-lg font-semibold"
                        >
                            Add Transaction
                        </button>
                    </div>
                </div>
                {/* RIGHT CARD */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-blue-200">
                        Monthly Overview
                    </h2>

                    <div className="space-y-4">

                        {/* TOTAL INCOME */}
                        <div className="p-4 rounded-xl border border-white/10 bg-green-600/20">
                            <h3 className="text-sm text-green-300">Total Income</h3>
                            <p className="text-2xl font-bold mt-1">
                                ₹{totalIncome.toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* TOTAL EXPENSE */}
                        <div className="p-4 rounded-xl border border-white/10 bg-red-600/20">
                            <h3 className="text-sm text-red-300">Total Expense</h3>
                            <p className="text-2xl font-bold mt-1">
                                ₹{totalExpense.toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* NET BALANCE */}
                        <div className="p-4 rounded-xl border border-white/10 bg-blue-600/20">
                            <h3 className="text-sm text-blue-300">Net Balance</h3>
                            <p className="text-2xl font-bold mt-1">
                                ₹{netBalance.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* TRANSACTIONS TABLE */}
            <div className="mt-10 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 shadow-xl">
                <h2 className="text-xl font-semibold text-blue-200 mb-4">Transactions</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-300 border-b border-white/10">
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Group</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-right">Amount</th>
                                <th className="p-2 text-left">Account</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((t, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-white/5 hover:bg-white/10 transition"
                                >
                                    <td className="p-2">{t.date}</td>
                                    <td className="p-2">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${t.type === "Income"
                                                ? "bg-green-500/30 text-green-300"
                                                : t.type === "Expense"
                                                    ? "bg-red-500/30 text-red-300"
                                                    : "bg-blue-500/30 text-blue-300"
                                                }`}
                                        >
                                            {t.type}
                                        </span>
                                    </td>

                                    <td className="p-2">{t.categoryGroup}</td>
                                    <td className="p-2">{t.category}</td>
                                    <td className="p-2">{t.description || "—"}</td>

                                    <td className="p-2 text-right">
                                        ₹{t.amount.toLocaleString("en-IN")}
                                    </td>

                                    <td className="p-2">{t.account}</td>
                                </tr>
                            ))}

                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-300 py-4">
                                        No transactions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                    9 )
}

{/* ---------------------- TRANSACTIONS TABLE ---------------------- */ }
<div className="mt-10 bg-[#0F1424] p-6 rounded-2xl border border-[#242B46] shadow-lg">
    <h3 className="text-lg font-semibold mb-4 text-[#FFD166]">Transactions</h3>

    {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions found for this month.</p>
    ) : (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#141A30] text-gray-300">
                    <tr>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-right">Amount</th>
                        <th className="p-3 text-left">Account</th>
                        <th className="p-3 text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b border-[#1E2438] hover:bg-[#1A2138] transition"
                        >
                            <td className="p-3">{item.date}</td>
                            <td className="p-3">
                                <span
                                    className={`px-2 py-1 rounded text-xs ${item.type === "Income"
                                            ? "bg-green-900 text-green-300"
                                            : "bg-red-900 text-red-300"
                                        }`}
                                >
                                    {item.type}
                                </span>
                            </td>
                            <td className="p-3">{item.category}</td>
                            <td className="p-3">{item.description}</td>
                            <td className="p-3 text-right font-semibold">
                                {currency} {item.amount}
                            </td>
                            <td className="p-3">{item.account}</td>
                            <td className="p-3 text-center">
                                <button
                                    onClick={() => deleteTx(item.id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</div>

{/* ---------------------- CATEGORY BREAKDOWN ---------------------- */ }
{
    categoryTotals.length > 0 && (
        <div className="mt-10 bg-[#0F1424] p-6 rounded-2xl border border-[#242B46]">
            <h3 className="text-lg font-semibold mb-4 text-[#FFD166]">
                Category Breakdown
            </h3>

            <div className="space-y-2">
                {categoryTotals.map((c) => (
                    <div
                        key={c.label}
                        className="flex justify-between p-3 bg-[#141A30] rounded-lg border border-[#242B46]"
                    >
                        <span className="text-gray-300">{c.label}</span>
                        <span className="text-[#FFD166] font-semibold">
                            {currency} {c.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

<div className="h-20"></div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        