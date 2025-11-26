"use client";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

/* ------------------ CATEGORY GROUP DEFINITIONS ------------------ */
const CATEGORY_GROUPS = {
  Income: ["Salary", "Freelance", "Business", "Other Income"],
  Fixed: ["Rent", "EMIs", "Subscriptions"],
  Living: ["Groceries", "Transport", "Utilities", "Entertainment"],
  Debt: ["Credit Card", "Personal Loan"],
  Savings: ["Emergency Fund", "Mutual Funds", "Fixed Deposit"],
};

export default function BudgetTracker() {
  const STORAGE_KEY = "ots_budget_transactions";

  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    group: "",
    category: "",
    description: "",
    amount: "",
    account: "",
    currency: "₹",
  });

  const chartRef = useRef(null);

  /* ---------------- LOAD / SAVE STORAGE ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  /* ---------------- CHART RENDER ---------------- */
  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const grouped = transactions.reduce((acc, t) => {
      if (t.type === "Expense") {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      }
      return acc;
    }, {});

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    if (window.expenseChartInstance) {
      window.expenseChartInstance.destroy();
    }

    window.expenseChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#FFD166", "#FF9F1C", "#F94144", "#F3722C",
              "#90BE6D", "#577590", "#4D908E"
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: { color: "white" },
          },
        },
        cutout: "65%",
      },
    });
  }, [transactions]);

  /* ---------------- FORM HANDLERS ---------------- */
  const updateForm = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addTransaction = () => {
    if (!formData.date || !formData.type || !formData.group || !formData.category || !formData.amount) {
      alert("Please fill all required fields.");
      return;
    }

    setTransactions([...transactions, { ...formData }]);

    setFormData({
      date: "",
      type: "",
      group: "",
      category: "",
      description: "",
      amount: "",
      account: "",
      currency: "₹",
    });
  };

  const deleteTxn = (i) => {
    setTransactions(transactions.filter((_, idx) => idx !== i));
  };

  /* ---------------- SUMMARY CALCULATIONS ---------------- */
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  /* ---------------- UI START ---------------- */
  return (
    <div className="min-h-screen p-6 text-white" style={{ background: "radial-gradient(circle at top, #151b38, #050814)" }}>
      
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 gold-glow inline-block"></span>
            One Tool – Monthly Budget Tracker
          </h1>
          <p className="text-gray-400 text-sm">A premium personal finance tracker.</p>
        </div>

        <div className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-xs bg-black/20">
          Local Mode – Stored in Browser
        </div>
      </header>


      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* LEFT – ADD TRANSACTION */}
        <div className="bg-[#141A30] p-5 rounded-2xl border border-gray-700 floating">
          <h2 className="text-lg font-semibold mb-1">Add Transaction</h2>
          <p className="text-gray-400 text-sm mb-4">Fill the details and add your entry.</p>

          <div className="space-y-3">

            {/* FORM FIELDS */}
            <input type="date" className="input" onChange={(e) => updateForm("date", e.target.value)} value={formData.date} />

            <select className="input" onChange={(e) => updateForm("type", e.target.value)} value={formData.type}>
              <option value="">Type</option>
              <option>Income</option>
              <option>Expense</option>
              <option>Transfer</option>
            </select>

            <select className="input" onChange={(e) => updateForm("group", e.target.value)} value={formData.group}>
              <option value="">Category Group</option>
              {Object.keys(CATEGORY_GROUPS).map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <select className="input" onChange={(e) => updateForm("category", e.target.value)} value={formData.category}>
              <option value="">Category</option>
              {CATEGORY_GROUPS[formData.group]?.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input type="text" placeholder="Description" className="input" onChange={(e) => updateForm("description", e.target.value)} value={formData.description} />

            <input type="number" placeholder="Amount" className="input" onChange={(e) => updateForm("amount", e.target.value)} value={formData.amount} />

            <select className="input" onChange={(e) => updateForm("account", e.target.value)} value={formData.account}>
              <option value="">Account</option>
              <option>Cash</option>
              <option>Bank</option>
              <option>Credit Card</option>
              <option>UPI / Wallet</option>
            </select>

            {/* BUTTON */}
            <button onClick={addTransaction}
              className="bg-[#FFD166] text-black px-4 py-2 rounded-full font-medium lift gold-glow hover:opacity-90">
              Add Transaction
            </button>
          </div>
        </div>


        {/* RIGHT – OVERVIEW */}
        <div className="bg-[#141A30] p-5 rounded-2xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>

          <div className="grid grid-cols-3 gap-3 mb-6">
            
            <div className="p-3 rounded-xl bg-black/20 border border-gray-700 lift">
              <p className="text-sm text-gray-400">Income</p>
              <p className="text-green-300 text-xl font-bold">{formData.currency}{totalIncome}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-gray-700 lift">
              <p className="text-sm text-gray-400">Expense</p>
              <p className="text-red-300 text-xl font-bold">{formData.currency}{totalExpense}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-gray-700 lift">
              <p className="text-sm text-gray-400">Net</p>
              <p className="text-yellow-300 text-xl font-bold">{formData.currency}{netBalance}</p>
            </div>

          </div>

          {/* DONUT CHART */}
          <div className="mt-4 bg-[#0F1328] p-4 rounded-xl border border-gray-700 lift">
            <p className="text-sm text-gray-400 mb-2">Expense Breakdown</p>
            <canvas ref={chartRef} className="w-full h-[220px]" />
          </div>
        </div>

      </div>
    </div>
  );
}