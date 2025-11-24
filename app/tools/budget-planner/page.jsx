"use client";
import { useState } from "react";

export default function BudgetPlanner() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;
    setExpenses([
      ...expenses,
      { name: expenseName, amount: parseFloat(expenseAmount) },
    ]);
    setExpenseName("");
    setExpenseAmount("");
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - totalExpenses;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Budget Planner</h2>
      <div className="mb-4">
        <label className="block mb-1">Monthly Income</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={income}
          onChange={e => setIncome(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Expense Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={expenseName}
          onChange={e => setExpenseName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Expense Amount</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={expenseAmount}
          onChange={e => setExpenseAmount(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={addExpense}
      >
        Add Expense
      </button>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Expenses</h3>
        <ul>
          {expenses.map((exp, idx) => (
            <li key={idx} className="flex justify-between border-b py-1">
              <span>{exp.name}</span>
              <span>${exp.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <div className="font-semibold">Total Expenses: ${totalExpenses.toFixed(2)}</div>
        <div className="font-semibold">Balance: ${balance.toFixed(2)}</div>
      </div>
    </div>
  );
}
