"use client";

import { useEffect, useState } from "react";

// -------------------------
// CONFIG (Future Firebase-ready)
// -------------------------
const STORAGE_KEY = "ots_budget_data";

// Category groups
const CATEGORY_GROUPS = {
  Income: ["Salary", "Business", "Freelance", "Investments", "Others"],
  Expense: ["Groceries", "Rent", "Transport", "Bills", "Shopping", "Health"],
};

// -------------------------
// Local Data Store (Upgradeable wrapper)
// -------------------------
const DataStore = {
  load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// -------------------------
// Component Starts
// -------------------------
export default function BudgetTracker() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    date: "",
    type: "",
    category: "",
    amount: "",
    notes: "",
  });

  useEffect(() => {
    setTransactions(DataStore.load());
  }, []);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTransaction = () => {
    if (!form.date || !form.type || !form.amount || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    const newEntry = { id: Date.now(), ...form };
    const updated = [...transactions, newEntry];

    setTransactions(updated);
    DataStore.save(updated);

    setForm({
      date: "",
      type: "",
      category: "",
      amount: "",
      notes: "",
    });
  };

  const deleteItem = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    DataStore.save(updated);
  };

  // Summary calculations
  const incomeSum = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expenseSum = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const net = incomeSum - expenseSum;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Budget Tracker
      </h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <p className="text-sm text-gray-500">Income</p>
          <h3 className="text-2xl font-bold text-green-600">₹{incomeSum}</h3>
        </div>
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <p className="text-sm text-gray-500">Expenses</p>
          <h3 className="text-2xl font-bold text-red-600">₹{expenseSum}</h3>
        </div>
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <p className="text-sm text-gray-500">Net Balance</p>
          <h3 className="text-2xl font-bold text-blue-600">₹{net}</h3>
        </div>
      </div>

      {/* FORM */}
      <div className="border rounded-lg p-6 bg-white shadow-sm mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.date}
            onChange={(e) => updateForm("date", e.target.value)}
          />

          <select
            className="border rounded-lg p-2"
            value={form.type}
            onChange={(e) => updateForm("type", e.target.value)}
          >
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select
            className="border rounded-lg p-2"
            value={form.category}
            onChange={(e) => updateForm("category", e.target.value)}
            disabled={!form.type}
          >
            <option value="">Select category</option>
            {CATEGORY_GROUPS[form.type]?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="number"
            className="border rounded-lg p-2"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => updateForm("amount", e.target.value)}
          />

          <input
            type="text"
            className="border rounded-lg p-2"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
          />
        </div>

        <button
          onClick={addTransaction}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Entry
        </button>
      </div>

      {/* TRANSACTION LIST */}
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        {transactions.length === 0 ? (
          <p className="text-gray-600">No transactions yet.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{t.category}</p>
                  <p className="text-gray-500 text-sm">
                    {t.date} · {t.type} · ₹{t.amount}
                  </p>
                </div>

                <button
                  className="text-red-500 text-sm"
                  onClick={() => deleteItem(t.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
