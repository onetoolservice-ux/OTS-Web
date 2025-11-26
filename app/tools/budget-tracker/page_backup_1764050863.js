"use client";

import { useState, useEffect } from "react";

export default function BudgetTracker() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");

  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  useEffect(() => {
    setIncome(JSON.parse(localStorage.getItem("income")) || []);
    setExpense(JSON.parse(localStorage.getItem("expense")) || []);
  }, []);

  const addIncome = () => {
    if (!incomeAmount || !incomeCategory) return;
    const item = {
      id: Date.now(),
      amount: Number(incomeAmount),
      category: incomeCategory,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...income, item];
    setIncome(updated);
    localStorage.setItem("income", JSON.stringify(updated));
    setIncomeAmount("");
    setIncomeCategory("");
  };

  const addExpense = () => {
    if (!expenseAmount || !expenseCategory) return;
    const item = {
      id: Date.now(),
      amount: Number(expenseAmount),
      category: expenseCategory,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...expense, item];
    setExpense(updated);
    localStorage.setItem("expense", JSON.stringify(updated));
    setExpenseAmount("");
    setExpenseCategory("");
  };

  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expense.reduce((s, e) => s + e.amount, 0);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-blue-700">Budget Tracker</h1>

      {/* INCOME */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">Add Income</h2>

        <input
          className="border p-2 rounded w-full mb-2"
          type="number"
          placeholder="Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full mb-2"
          value={incomeCategory}
          onChange={(e) => setIncomeCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Salary</option>
          <option>Business</option>
          <option>Bonus</option>
          <option>Other</option>
        </select>

        <button
          onClick={addIncome}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Income
        </button>
      </section>

      {/* EXPENSE */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-red-700 mb-4">Add Expense</h2>

        <input
          className="border p-2 rounded w-full mb-2"
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full mb-2"
          value={expenseCategory}
          onChange={(e) => setExpenseCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Medical</option>
          <option>Other</option>
        </select>

        <button
          onClick={addExpense}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </section>

      {/* SUMMARY */}
      <section className="mt-12 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-3">Summary</h2>
        <p>Total Income: ₹{totalIncome}</p>
        <p>Total Expense: ₹{totalExpense}</p>

        <p className="mt-2 font-bold">
          Balance:{" "}
          <span
            className={
              totalIncome - totalExpense >= 0
                ? "text-green-700"
                : "text-red-700"
            }
          >
            ₹{totalIncome - totalExpense}
          </span>
        </p>
      </section>
    </main>
  );
}
# Kill port 3000
kill -9 $(lsof -t -i:3000) 2>/dev/null

# Kill Node if stuck
pkill node 2>/dev/null

# Verify that only one budget-tracker folder exists
find ap