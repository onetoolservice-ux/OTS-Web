"use client";

import { useState, useEffect } from "react";

/**
 * OneTool – Budget Tracker (Premium UI)
  * Fully client-side.
   * No backend needed.
    */

export default function BudgetTracker() {
    // ----------------------------
    // STATE
    // ----------------------------
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        date: "",
        type: "",
        group: "",
        category: "",
        description: "",
        amount: "",
        account: "",
        currency: "₹",
    });

    const CATEGORY_GROUPS = {
        Income: ["Salary", "Freelance", "Business", "Other Income"],
        Fixed: ["Rent", "EMIs", "Subscriptions"],
        Living: ["Groceries", "Transport", "Utilities", "Entertainment"],
        Debt: ["Credit Card", "Personal Loan"],
        Savings: ["Emergency Fund", "Mutual Funds", "Fixed Deposit"],
    };

    // ----------------------------
    // EFFECT – Load from localStorage
    // ----------------------------
    useEffect(() => {
        const saved = localStorage.getItem("ots_budget_v1");
        if (saved) setTransactions(JSON.parse(saved));
    }, []);

    // ----------------------------
    // SAVE TO STORAGE
    // ----------------------------
    const save = (data) => {
        localStorage.setItem("ots_budget_v1", JSON.stringify(data));
        setTransactions(data);
    };

    // ----------------------------
    // HANDLE INPUT CHANGE
    // ----------------------------
    const updateForm = (k, v) => setForm({ ...form, [k]: v });

    // ----------------------------
    // ADD A TRANSACTION
    // ----------------------------
    function addTransaction(e) {
        e.preventDefault();

        if (!form.date || !form.type || !form.group || !form.category || !form.amount || !form.account) {
            alert("Please fill all required fields.");
            return;
        }

        const newTx = { ...form, id: Date.now() };
        const updated = [...transactions, newTx];
        save(updated);

        setForm({
            date: "",
            type: "",
            group: "",
            category: "",
            description: "",
            amount: "",
            account: "",
            currency: form.currency,
        });
    }

    // ----------------------------
    // DELETE TX
    // ----------------------------
    const deleteTx = (id) => {
        const updated = transactions.filter((t) => t.id !== id);
        save(updated);
    };

    // ----------------------------
    // SUMMARY
    // ----------------------------
    const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const net = totalIncome - totalExpense;

    // ----------------------------
    // SMALL INPUT COMPONENT
    // ----------------------------
    const Input = ({ label, children }) => (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-300">{label}</label>
            {children}
        </div>
    );

    // ----------------------------
    // MAIN UI
    // ----------------------------
    return (
        <main className="min-h-screen bg-[#050814] text-white p-4 md:p-6">
            {/* ----------------------- HEADER ----------------------- */}
            <header className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div>
                    <h1 className="text-xl font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(255,209,102,0.8)]"></span>
                        One Tool – Monthly Budget Tracker
                    </h1>
                    <p className="text-sm text-gray-400">
                        A clean finance dashboard to track income & expenses.
                    </p>
                </div>

                <div className="px-3 py-1 rounded-full border border-gray-700 bg-[#0D0F1F]/70 text-sm text-gray-300">
                    Mode: <span className="text-yellow-400 font-semibold">Local Only</span>
                </div>
            </header>

            {/* ----------------------- GRID ----------------------- */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ----------------------- LEFT CARD – ADD TX ----------------------- */}
                <div className="bg-[#141A30] border border-[#242B46] rounded-2xl p-5 shadow-xl">
                    <h2 className="text-lg font-semibold mb-1">Add Transaction</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Quickly add income, expenses, or transfers.
                    </p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={addTransaction}>
                        <Input label="Date">
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => updateForm("date", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            />
                        </Input>

                        <Input label="Type">
                            <select
                                value={form.type}
                                onChange={(e) => updateForm("type", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            >
                                <option value="">Select</option>
                                <option>Income</option>
                                <option>Expense</option>
                                <option>Transfer</option>
                            </select>
                        </Input>

                        <Input label="Category Group">
                            <select
                                value={form.group}
                                onChange={(e) => updateForm("group", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            >
                                <option value="">Select</option>
                                {Object.keys(CATEGORY_GROUPS).map((grp) => (
                                    <option key={grp}>{grp}</option>
                                ))}
                            </select>
                        </Input>

                        <Input label="Category">
                            <select
                                value={form.category}
                                onChange={(e) => updateForm("category", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            >
                                <option value="">Select</option>
                                {(CATEGORY_GROUPS[form.group] || []).map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </Input>

                        <Input label="Description">
                            <input
                                type="text"
                                placeholder="Optional"
                                value={form.description}
                                onChange={(e) => updateForm("description", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            />
                        </Input>

                        <Input label="Amount">
                            <input
                                type="number"
                                value={form.amount}
                                onChange={(e) => updateForm("amount", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            />
                        </Input>

                        <Input label="Account">
                            <select
                                value={form.account}
                                onChange={(e) => updateForm("account", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            >
                                <option value="">Select</option>
                                <option>Cash</option>
                                <option>Bank</option>
                                <option>Credit Card</option>
                                <option>UPI / Wallet</option>
                            </select>
                        </Input>

                        <Input label="Currency Symbol">
                            <input
                                type="text"
                                maxLength={3}
                                value={form.currency}
                                onChange={(e) => updateForm("currency", e.target.value)}
                                className="bg-[#0A0D18] border border-gray-700 rounded-full px-3 py-2 text-sm"
                            />
                        </Input>

                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => save([])}
                                className="px-4 py-2 rounded-full text-sm border border-gray-600 text-gray-300"
                            >
                                Clear All
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow-[0_0_15px_rgba(255,209,102,0.5)]"
                            >
                                Add Transaction
                            </button>
                        </div>
                    </form>
                </div>
                {/* ----------------------- RIGHT CARD – SUMMARY ----------------------- */}
                <div className="bg-[#141A30] border border-[#242B46] rounded-2xl p-5 shadow-xl">
                    <h2 className="text-lg font-semibold mb-1">Monthly Overview</h2>
                    <p className="text-sm text-gray-400 mb-4">Income, Expenses & Net Balance</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-xl p-4 bg-[#0F1328] border border-gray-700">
                            <p className="text-sm text-gray-400">Income</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">
                                {form.currency}{totalIncome.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-xl p-4 bg-[#0F1328] border border-gray-700">
                            <p className="text-sm text-gray-400">Expenses</p>
                            <p className="text-2xl font-bold text-red-400 mt-1">
                                {form.currency}{totalExpense.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-xl p-4 bg-[#0F1328] border border-gray-700">
                            <p className="text-sm text-gray-400">Net Balance</p>
                            <p className="text-2xl font-bold text-yellow-300 mt-1">
                                {form.currency}{net.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------------------- TABLE ----------------------- */}
            <section className="bg-[#141A30] border border-[#242B46] rounded-2xl p-5 mt-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-3">Transactions</h2>

                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-[#0A0D18] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Group</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-right">Amount</th>
                                <th className="p-2 text-left">Account</th>
                                <th className="p-2 text-center">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-gray-800">
                                    <td className="p-2">{tx.date}</td>

                                    <td className="p-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${tx.type === "Income"
                                                    ? "bg-green-900/40 text-green-400"
                                                    : tx.type === "Expense"
                                                        ? "bg-red-900/40 text-red-400"
                                                        : "bg-blue-900/40 text-blue-300"
                                                }`}
                                        >
                                            {tx.type}
                                        </span>
                                    </td>

                                    <td className="p-2">{tx.group}</td>
                                    <td className="p-2">{tx.category}</td>
                                    <td className="p-2">{tx.description}</td>

                                    <td className="p-2 text-right">
                                        {tx.currency}{Number(tx.amount).toLocaleString()}
                                    </td>

                                    <td className="p-2">{tx.account}</td>

                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => deleteTx(tx.id)}
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
            </section>

            <div className="text-gray-400 text-center mt-4 text-xs">
                © 2025 One Tool Solutions – Budget Tracker
            </div>
        </main>
    );
}