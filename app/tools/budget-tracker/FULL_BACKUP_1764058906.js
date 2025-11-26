"use client";
import { useState, useEffect } from "react";

{REMOVED_DUPLICATE} {

    // ---------------------- STATE ----------------------
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState("");
    const [type, setType] = useState("Income");
    const [categoryGroup, setCategoryGroup] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("Cash");
    const [currency, setCurrency] = useState("₹");

    const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"));
    const [year, setYear] = useState(String(new Date().getFullYear()));

    // ---------------------- CATEGORY GROUPS ----------------------
    const groups = {
        "Income Sources": ["Salary", "Business", "Investment", "Gift"],
        "Home Expenses": ["Rent", "Electricity", "Water", "Groceries"],
        "Transport": ["Fuel", "Taxi", "Bus", "Bike Maintenance"],
        "Food": ["Restaurant", "Snacks", "Coffee"],
        "Shopping": ["Clothes", "Electronics", "Accessories"],
        "Health": ["Medicine", "Doctor", "Fitness"],
        "Other": ["Misc", "Uncategorized"]
    };

    // ---------------------- LOAD FROM LOCAL STORAGE ----------------------
    useEffect(() => {
        const saved = localStorage.getItem("ots-budget-data");
        if (saved) setTransactions(JSON.parse(saved));
    }, []);

    // ---------------------- SAVE TO LOCAL STORAGE ----------------------
    useEffect(() => {
        localStorage.setItem("ots-budget-data", JSON.stringify(transactions));
    }, [transactions]);

    // ---------------------- ADD TRANSACTION ----------------------
    function addTransaction() {
        if (!date || !amount || !category) {
            alert("Please fill Date, Category and Amount.");
            return;
        }

        const entry = {
            id: Date.now(),
            date,
            type,
            categoryGroup,
            category,
            description,
            amount: Number(amount),
            account,
            currency
        };

        setTransactions([entry, ...transactions]);

        // Clear fields
        setDescription("");
        setAmount("");
    }

    function deleteTx(id) {
        setTransactions(transactions.filter((t) => t.id !== id));
    }

    // ---------------------- FILTER MONTH ----------------------
    const filtered = transactions.filter((t) => {
        const d = new Date(t.date);
        return (
            d.getMonth() + 1 === Number(month) &&
            d.getFullYear() === Number(year)
        );
    });

    // ---------------------- SUMMARY ----------------------
    const income = filtered
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = filtered
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    function fmt(x) {
        return x.toLocaleString("en-IN");
    } return (
        <main className="max-w-4xl mx-auto p-4">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">
                    One Tool — Budget Tracker
                </h1>

                <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    Local Mode — Saved in Browser
                </div>
            </div>

            {/* TWO COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ADD TRANSACTION CARD */}
                <div className="p-5 rounded-xl bg-white shadow">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">Add Transaction</h2>

                    {/* Date */}
                    <input
                        type="date"
                        className="w-full p-2 border rounded mb-3"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    {/* Type */}
                    <select
                        className="w-full p-2 border rounded mb-3"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option>Income</option>
                        <option>Expense</option>
                    </select>

                    {/* Category Group */}
                    <select
                        className="w-full p-2 border rounded mb-3"
                        value={categoryGroup}
                        onChange={(e) => {
                            setCategoryGroup(e.target.value);
                            setCategory("");
                        }}
                    >
                        <option value="">Select Category Group</option>
                        {Object.keys(groups).map((g) => (
                            <option key={g}>{g}</option>
                        ))}
                    </select>

                    {/* Category */}
                    <select
                        className="w-full p-2 border rounded mb-3"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {(groups[categoryGroup] || []).map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>

                    {/* Description */}
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-2 border rounded mb-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Amount */}
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 border rounded mb-3"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    {/* Account */}
                    <select
                        className="w-full p-2 border rounded mb-3"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    >
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>Credit Card</option>
                        <option>UPI/Wallet</option>
                    </select>

                    {/* Currency */}
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-3"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />

                    {/* BUTTONS */}
                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded mb-2"
                        onClick={addTransaction}
                    >
                        Add Transaction
                    </button>

                    <button
                        className="w-full bg-gray-200 py-2 rounded"
                        onClick={() => {
                            setDate("");
                            setCategoryGroup("");
                            setCategory("");
                            setDescription("");
                            setAmount("");
                        }}
                    >
                        Clear All
                    </button>
                </div>

                {/* MONTH SUMMARY */}
                <div className="p-5 rounded-xl bg-white shadow">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">Monthly Overview</h2>

                    {/* Filters */}
                    <div className="flex gap-2 mb-4">
                        <select
                            className="p-2 border rounded w-1/3"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {Array.from({ length: 12 }, (_, i) => {
                                const m = String(i + 1).padStart(2, "0");
                                return <option key={m}>{m}</option>;
                            })}
                        </select>

                        <input
                            type="number"
                            className="p-2 border rounded w-1/3"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />

                        <button
                            className="p-2 bg-blue-100 text-blue-700 rounded w-1/3"
                            onClick={() => {
                                setMonth(String(new Date().getMonth() + 1).padStart(2, "0"));
                                setYear(String(new Date().getFullYear()));
                            }}
                        >
                            This Month
                        </button>
                    </div>

                    {/* Summary Numbers */}
                    <div className="mb-3">
                        <p className="text-green-600 font-semibold">Income: {currency}{fmt(income)}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-red-600 font-semibold">Expense: {currency}{fmt(expense)}</p>
                    </div>
                    <div>
                        <p className="text-blue-600 font-bold">Balance: {currency}{fmt(balance)}</p>
                    </div>
                </div>
            </div>

            ){/* TRANSACTIONS TABLE */}
            <div className="mt-10 p-5 bg-white rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                    Transactions
                </h2>

                {filtered.length === 0 ? (
                    <p className="text-gray-500">No transactions found for this month.</p>
                ) : (
                    <div className="overflow-auto">
                        <table className="w-full text-sm border">
                            <thead className="bg-blue-50 text-gray-700 sticky top-0">
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
                                        className="border-b hover:bg-blue-50 transition"
                                    >
                                        <td className="p-3">{item.date}</td>

                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${item.type === "Income"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {item.type}
                                            </span>
                                        </td>

                                        <td className="p-3">{item.category}</td>
                                        <td className="p-3">{item.description}</td>

                                        <td className="p-3 text-right font-semibold">
                                            {currency}
                                            {fmt(item.amount)}
                                        </td>

                                        <td className="p-3">{item.account}</td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => deleteTx(item.id)}
                                                className="text-red-500 hover:text-red-700"
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

            {/* CATEGORY BREAKDOWN */}
            <div className="mt-10 p-5 bg-white rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                    Category Breakdown
                </h2>

                {categoryTotals.length === 0 ? (
                    <p className="text-gray-500">No category data for this month.</p>
                ) : (
                    <div className="space-y-4">
                        {categoryTotals.map((c) => (
                            <div
                                key={c.category}
                                className="flex justify-between border-b pb-2"
                            >
                                <span className="text-gray-700">{c.category}</span>
                                <span className="font-semibold text-blue-700">
                                    {currency}
                                    {fmt(c.total)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
}

import { useEffect, useState } from "react";

export default function BudgetTracker() {
    // --------------------------
    // INITIAL STATES
    // --------------------------
    const [transactions, setTransactions] = useState([]);
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [currency, setCurrency] = useState("₹");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    // --------------------------
    // LOCAL STORAGE LOAD
    // --------------------------
    useEffect(() => {
        const saved = localStorage.getItem("ots-budget");
        if (saved) setTransactions(JSON.parse(saved));
    }, []);

    // --------------------------
    // SAVE ON CHANGE
    // --------------------------
    useEffect(() => {
        localStorage.setItem("ots-budget", JSON.stringify(transactions));
    }, [transactions]);

    // --------------------------
    // ADD TRANSACTION
    // --------------------------
    function addTransaction() {
        if (!date || !type || !category || !amount || !account) {
            alert("Please fill all required fields.");
            return;
        }

        const newTx = {
            id: Date.now(),
            date,
            type,
            category,
            description,
            amount: Number(amount),
            account,
        };

        setTransactions([...transactions, newTx]);

        // CLEAR FORM
        setDate("");
        setType("");
        setCategory("");
        setDescription("");
        setAmount("");
        setAccount("");
    }

    // --------------------------
    // DELETE TRANSACTION
    // --------------------------
    function deleteTx(id) {
        setTransactions(transactions.filter((tx) => tx.id !== id));
    }

    // --------------------------
    // FILTER FOR SELECTED MONTH
    // --------------------------
    const filtered = transactions.filter((tx) => {
        const d = new Date(tx.date);
        return d.getMonth() + 1 === Number(month) && d.getFullYear() === Number(year);
    });

    // --------------------------
    // SUMMARY CALCULATIONS
    // --------------------------
    const totalIncome = filtered
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filtered
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const net = totalIncome - totalExpense;

    // --------------------------
    // CATEGORY TOTALS
    // --------------------------
    const categoryTotals = [];

    filtered.forEach((tx) => {
        const existing = categoryTotals.find((c) => c.category === tx.category);
        if (existing) {
            existing.total += tx.amount;
        } else {
            categoryTotals.push({
                category: tx.category,
                total: tx.amount,
            });
        }
    });

    // --------------------------
    // FORMAT NUMBER
    // --------------------------
    function fmt(n) {
        return Number(n).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // --------------------------
    // UI RETURN STARTS BELOW
    // --------------------------
    // ===============================
    // UI RETURN STARTS BELOW
    // ===============================
    return (
        <main className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold text-blue-600 mb-6">Budget Tracker</h1>

            <div className="grid md:grid-cols-2 gap-6">

                {/* LEFT PANEL — ADD TRANSACTION FORM */}
                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Transaction</h2>

                    {/* DATE */}
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg"
                    />

                    {/* TYPE */}
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg"
                    >
                        <option>Income</option>
                        <option>Expense</option>
                    </select>

                    {/* CATEGORY */}
                    <input
                        type="text"
                        value={category}
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg"
                    />

                    {/* DESCRIPTION */}
                    <input
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-lg"
                    />

                    {/* AMOUNT */}
                    <input
                        type="number"
                        value={amount}
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full mb-4 p-2 border rounded-lg"
                    />

                    <button
                        onClick={addTransaction}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                        Add Transaction
                    </button>
                </div>

                {/* RIGHT PANEL — MONTH SUMMARY */}
                <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>

                    <p className="text-gray-700 mb-1">Total Income:
                        <span className="text-green-600 font-semibold"> ₹{fmt(totalIncome)}</span>
                    </p>

                    <p className="text-gray-700 mb-1">Total Expense:
                        <span className="text-red-600 font-semibold"> ₹{fmt(totalExpense)}</span>
                    </p>

                    <p className="text-gray-700">Net Balance:
                        <span className="text-blue-600 font-semibold"> ₹{fmt(net)}</span>
                    </p>
                </div>
            </div>

            {/* TRANSACTIONS TABLE */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Transactions</h2>

                {filtered.length === 0 ? (
                    <p className="text-gray-500">No transactions available.</p>
                ) : (
                    <table className="w-full border text-sm bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-right">Amount</th>
                                <th className="p-2 text-center">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((tx) => (
                                <tr key={tx.id} className="border-t">
                                    <td className="p-2">{tx.date}</td>
                                    <td className="p-2">{tx.type}</td>
                                    <td className="p-2">{tx.category}</td>
                                    <td className="p-2">{tx.description}</td>
                                    <td className="p-2 text-right">₹{fmt(tx.amount)}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => deleteTransaction(tx.id)}
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </main>
    );
}