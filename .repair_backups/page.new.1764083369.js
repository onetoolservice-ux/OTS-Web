"use client";
import React, { useEffect, useState, useRef } from "react";

const DEFAULT_CATEGORIES = {
    "Personal": ["Groceries", "Dining", "Clothes", "Health"],
    "Transport": ["Fuel", "Taxi", "Public Transport"],
    "Bills": ["Electricity", "Water", "Internet", "Rent"],
    "Income": ["Salary", "Freelance", "Interest"],
    "Other": ["Gift", "Misc"]
};

const DEFAULT_ACCOUNTS = ["Cash", "Bank", "Credit Card", "UPI/Wallet"];

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatMoney(n, currencySymbol = "₹") {
    const num = Number(n) || 0;
    return currencySymbol + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function readStorage() {
    try {
        const raw = localStorage.getItem("ots_budget_v1");
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.error("storage parse error", e);
        return null;
    }
}

function writeStorage(data) {
    try {
        localStorage.setItem("ots_budget_v1", JSON.stringify(data));
    } catch (e) {
        console.error("storage write error", e);
    }
}

export default function BudgetTracker() {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        type: "Expense",
        group: "Personal",
        category: "Groceries",
        description: "",
        amount: "",
        account: DEFAULT_ACCOUNTS[0],
        currency: "₹"
    });
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [accounts] = useState(DEFAULT_ACCOUNTS);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [toast, setToast] = useState("");
    const fileInputRef = useRef(null);
    const [filtered, setFiltered] = useState([]);
    const [donutData, setDonutData] = useState([]);
    const [modeLocal] = useState(true);
    useEffect(() => {
        const d = readStorage();
        if (d && Array.isArray(d.transactions)) {
            setTransactions(d.transactions);
        }
    }, []);
    useEffect(() => {
        writeStorage({ transactions });
    }, [transactions]);
    useEffect(() => {
        filterByMonth();
    }, [transactions, month, year]);
    function setToastMessage(msg, delay = 2500) {
        setToast(msg);
        setTimeout(() => setToast(""), delay);
    }

    function handleFormChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function addTransaction(e) {
        e && e.preventDefault();
        const amt = Number(form.amount);
        if (!form.date || !form.category || !form.amount || isNaN(amt)) {
            setToastMessage("Please fill date, category and numeric amount");
            return;
        }
        const t = {
            id: uid(),
            date: form.date,
            type: form.type,
            group: form.group,
            category: form.category,
            description: form.description || "",
            amount: Number(amt),
            account: form.account,
            currency: form.currency || "₹"
        };
        setTransactions(prev => [t, ...prev]);
        setForm(prev => ({ ...prev, description: "", amount: "" }));
        setToastMessage("Transaction added");
    }

    function deleteTransaction(id) {
        setTransactions(prev => prev.filter(p => p.id !== id));
        setToastMessage("Deleted");
    }

    function clearAll() {
        if (confirm("Clear all transactions? This will remove local data.")) {
            setTransactions([]);
            setToastMessage("All cleared");
        }
    }

    function filterByMonth() {
        const mm = Number(month) - 1;
        const yy = Number(year);
        const f = transactions.filter(tx => {
            const d = new Date(tx.date);
            return d.getMonth() === mm && d.getFullYear() === yy;
        });
        setFiltered(f);
        buildDonut(f);
    }

    function buildDonut(list) {
        const map = {};
        list.forEach(tx => {
            if (!map[tx.category]) map[tx.category] = 0;
            map[tx.category] += (tx.type === "Income" ? tx.amount : tx.amount);
        });
        const arr = Object.keys(map).map(k => ({ label: k, value: map[k] }));
        setDonutData(arr);
    } function exportCSV() {
        if (transactions.length === 0) {
            setToastMessage("No data to export");
            return;
        }
        const header = ["id", "date", "type", "group", "category", "description", "amount", "account", "currency"];
        const rows = transactions.map(t => header.map(h => JSON.stringify(t[h] || "")).join(","));
        const csv = header.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ots_budget_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setToastMessage("CSV exported");
    }

    function importCSVFile(file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const text = ev.target.result;
                const lines = text.split(/\r?\n/).filter(Boolean);
                if (lines.length < 2) throw new Error("Invalid CSV");
                const header = lines[0].split(",").map(h => h.replace(/(^"|"$)/g, ""));
                const data = lines.slice(1).map(l => {
                    const cols = l.match(/(".*?"|[^",\s]+)(?=\s*,\s*$)/g) || [];
                    const obj = {};
                    cols.forEach((c, i) => {
                        let v = c.replace(/(^"|"$)/g, "");
                        const key = header[i];
                        if (key === "amount") v = Number(v);
                        obj[key] = v;
                    });
                    if (!obj.id) obj.id = uid();
                    return obj;
                });
                setTransactions(prev => [...data, ...prev]);
                setToastMessage("CSV imported");
            } catch (e) {
                console.error(e);
                setToastMessage("CSV import failed");
            }
        };
        reader.readAsText(file);
    }

    function handleImportClick() {
        fileInputRef.current && fileInputRef.current.click();
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ots_budget_backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToastMessage("JSON backup exported successfully!");
    setToastShow(true);
} catch (err) {
    console.error(err);
    setToastMessage("Failed to export JSON");
    setToastShow(true);
}
}

console.error(err);
setToastMessage("Failed to import JSON");
setToastShow(true);
            }
        };
reader.readAsText(file);
    } catch (err) {
    console.error(err);
    setToastMessage("Import failed");
    setToastShow(true);
}
}

return (
    <div style={{ minHeight: "100vh", padding: "18px", background: "#f7fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h1 style={{ fontSize: 22, color: "#0f172a", margin: 0 }}>One Tool — Budget Tracker</h1>
                <div style={{ fontSize: 12, color: "#475569", background: "#fff", padding: "6px 10px", borderRadius: 999, boxShadow: "0 1px 2px rgba(2,6,23,0.06)" }}>Mode: Local</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" }}>

                <div style={{ background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
                    <h2 style={{ margin: "0 0 12px 0", fontSize: 16, color: "#0f172a" }}>Add Transaction</h2>

                    <form onSubmit={addTransaction} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>

                        <select name="type" value={form.type} onChange={handleFormChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                            <option value="Transfer">Transfer</option>
                        </select>

                        <select name="group" value={form.group} onChange={(e) => { handleFormChange(e); const g = e.target.value; const c = (categories[g] && categories[g][0]) || ""; setForm(prev => ({ ...prev, group: g, category: c })); }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                            {Object.keys(categories).map(k => (<option key={k} value={k}>{k}</option>))}
                        </select>

                        <select name="category" value={form.category} onChange={handleFormChange} style={{ gridColumn: "1 / span 2", padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                            {(categories[form.group] || []).map(c => (<option key={c} value={c}>{c}</option>))}
                        </select>

                        <input type="date" name="date" value={form.date} onChange={handleFormChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }} />

                        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleFormChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }} />

                        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleFormChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }} />

                        <select name="account" value={form.account} onChange={handleFormChange} style={{ padding: 10, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                            {accounts.map(a => (<option key={a} value={a}>{a}</option>))}
                        </select>

                        <div style={{ gridColumn: "1 / span 2", display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                            <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 8 }}>Add Transaction</button>

                            <button type="button" onClick={clearAll} style={{ background: "transparent", color: "#0f172a", border: "1px solid #e2e8f0", padding: "10px 12px", borderRadius: 8 }}>Clear All</button>
                        </div>
                    </form>

                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={exportCSV} style={{ background: "transparent", border: "none", color: "#2563eb", fontSize: 13 }}>Export CSV</button>
                        <button onClick={downloadJSONBackup} style={{ background: "transparent", border: "none", color: "#2563eb", fontSize: 13 }}>Export JSON</button>
                        <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ background: "transparent", border: "none", color: "#2563eb", fontSize: 13 }}>Import CSV/JSON</button>

                        <input ref={fileInputRef} type="file" accept=".csv,.json" style={{ display: "none" }} onChange={(ev) => { const f = ev.target.files && ev.target.files[0]; if (!f) return; if (f.name.endsWith(".csv")) importCSVFile(f); else if (f.name.endsWith(".json")) importJSONFile(f); ev.target.value = ""; }} />
                    </div>
                </div>

                <div style={{ background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>

                    <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#0f172a" }}>Monthly Overview</h3>

                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ padding: 8, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                            {Array.from({ length: 12 }, (_, i) => (<option key={i} value={i + 1}>{String(i + 1).padStart(2, "0")}</option>))}
                        </select>

                        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ padding: 8, borderRadius: 8, border: "1px solid #e2e8f0", width: 90 }} />

                        <button onClick={() => { const d = new Date(); setMonth(d.getMonth() + 1); setYear(d.getFullYear()); }} style={{ padding: 8, borderRadius: 8, border: "1px solid #e2e8f0", background: "#f1f5f9" }}>This Month</button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>

                        <div style={{ background: "#ecfdf5", padding: 10, borderRadius: 8 }}>
                            <div style={{ fontSize: 12, color: "#059669" }}>Income</div>
                            <div style={{ fontWeight: 700, color: "#064e3b", fontSize: 16 }}>{formatMoney(filtered.filter(t => t.type === "Income").reduce((s, t) => s + t.amount, 0))}</div>
                        </div>

                        <div style={{ background: "#ffefef", padding: 10, borderRadius: 8 }}>
                            <div style={{ fontSize: 12, color: "#ef4444" }}>Expense</div>
                            <div style={{ fontWeight: 700, color: "#7f1d1d", fontSize: 16 }}>{formatMoney(filtered.filter(t => t.type !== "Income").reduce((s, t) => s + t.amount, 0))}</div>
                        </div>

                        <div style={{ background: "#eff6ff", padding: 10, borderRadius: 8 }}>
                            <div style={{ fontSize: 12, color: "#2563eb" }}>Net</div>
                            <div style={{ fontWeight: 700, color: "#1e40af", fontSize: 16 }}>{formatMoney(filtered.reduce((s, t) => t.type === "Income" ? s + t.amount : s - t.amount, 0))}</div>
                        </div>

                    </div>

                    {/* Donut chart */}
                    <div>
                        {donutData.length > 0 ? (
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <svg viewBox="0 0 160 160" width="120" height="120">
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = "ots_budget_backup.json";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                    setToastMessage("JSON backup exported successfully!");
                                    setToastShow(true);
    } catch (err) {
                                        console.error(err);
                                    setToastMessage("Failed to export JSON");
                                    setToastShow(true);
    }
}

                                    console.error(err);
                                    setToastMessage("Failed to import JSON");
                                    setToastShow(true);
            }
        };
                                    reader.readAsText(file);
    } catch (err) {
                                        console.error(err);
                                    setToastMessage("Import failed");
                                    setToastShow(true);
    }
}

                                    {(() => { const total = donutData.reduce((s, d) => s + d.value, 0) || 1; let start = -Math.PI / 2; let i = 0; return donutData.map(d => { const slice = (d.value / total) * Math.PI * 2; const end = start + slice; const x1 = 80 + 60 * Math.cos(start); const y1 = 80 + 60 * Math.sin(start); const x2 = 80 + 60 * Math.cos(end); const y2 = 80 + 60 * Math.sin(end); const largeArc = slice > Math.PI ? 1 : 0; const path = `M 80 80 L ${x1} ${y1} A 60 60 0 ${largeArc} 1 ${x2} ${y2} Z`; const colorPalette = ["#60a5fa", "#34d399", "#fca5a5", "#fde68a", "#c7b3ff", "#93c5fd", "#fbbf24"]; const fillColor = colorPalette[i % colorPalette.length]; i++; start = end; return (<path key={d.label} d={path} fill={fillColor} stroke="#fff" strokeWidth="1" />); }); })()}
                                    <circle cx="80" cy="80" r="34" fill="#ffffff" />
                                </svg>

                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#0f172a" }}>Top Categories</h4>
                                    <div>
                                        {donutData.map((d, idx) => {
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = "ots_budget_backup.json";
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                            URL.revokeObjectURL(url);
                                            setToastMessage("JSON backup exported successfully!");
                                            setToastShow(true);
                                        } catch (err) {
                                            console.error(err);
                                        setToastMessage("Failed to export JSON");
                                        setToastShow(true);
    }
}

                                        console.error(err);
                                        setToastMessage("Failed to import JSON");
                                        setToastShow(true);
            }
        };
                                        reader.readAsText(file);
    } catch (err) {
                                            console.error(err);
                                        setToastMessage("Import failed");
                                        setToastShow(true);
    
}

                                        const colorPalette = ["#60a5fa", "#34d399", "#fca5a5", "#fde68a", "#c7b3ff", "#93c5fd", "#fbbf24"]; return (
                                        <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{ width: 12, height: 12, background: colorPalette[idx % colorPalette.length], borderRadius: 3 }} />
                                                <div style={{ fontSize: 13, color: "#0f172a" }}>{d.label}</div>
                                            </div>
                                            <div style={{ fontWeight: 700, color: "#0f172a" }}>{formatMoney(d.value)}</div>
                                        </div>
                                        );
                                            })}
                                    </div>
                                </div>
                            </div>
                        ) : (<div style={{ color: "#94a3b8" }}>No category data</div>)}
                    </div>

                </div>
            </div>

            <div style={{ marginTop: 18, background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 15, color: "#0f172a" }}>All Transactions</h3>

                {filtered.length === 0 ? (<div style={{ padding: 20, color: "#94a3b8" }}>No transactions found.</div>) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f8fafc" }}>
                                <tr>
                                    <th style={th}>Date</th>
                                    <th style={th}>Type</th>
                                    <th style={th}>Group</th>
                                    <th style={th}>Category</th>
                                    <th style={th}>Description</th>
                                    <th style={{ ...th, textAlign: "right" }}>Amount</th>
                                    <th style={th}>Account</th>
                                    <th style={{ ...th, textAlign: "center" }}>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(tx => (
                                    <tr key={tx.id} style={{ borderTop: "1px solid #eef2f7" }}>
                                        <td style={td}>{tx.date}</td>
                                        <td style={td}>{tx.type}</td>
                                        <td style={td}>{tx.group}</td>
                                        <td style={td}>{tx.category}</td>
                                        <td style={td}>{tx.description}</td>
                                        <td style={{ ...td, textAlign: "right" }}>{formatMoney(tx.amount, tx.currency)}</td>
                                        <td style={td}>{tx.account}</td>
                                        <td style={{ ...td, textAlign: "center" }}>
                                            <button onClick={() => deleteTransaction(tx.id)} style={{ background: "transparent", border: "none", color: "#ef4444" }}>✕</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

            </div>

            {toast && (
                <div style={{ position: "fixed", right: 16, bottom: 16, background: "#111827", color: "#fff", padding: "10px 14px", borderRadius: 8, boxShadow: "0 8px 24px rgba(2,6,23,0.2)" }}>
                    {toast}
                </div>
            )}

        </div>
    </div>
);
}

// ===== REASSEMBLED TAIL (UI + JSX) =====
