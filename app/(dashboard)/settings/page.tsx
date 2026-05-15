"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [model, setModel] = useState("polynomial-d2");
  const [notifications, setNotifications] = useState(true);
  const [diminishing, setDiminishing] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-slate-400 text-sm">Configure the prediction platform to your preferences</p>
      </div>

      {/* Model config */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
        <h3 className="font-semibold text-slate-800">Model Configuration</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Regression Model</label>
          <select value={model} onChange={e => setModel(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-slate-50">
            <option value="polynomial-d2">Polynomial Regression (Degree 2) — Current</option>
            <option value="polynomial-d3">Polynomial Regression (Degree 3)</option>
            <option value="linear">Simple Linear Regression</option>
          </select>
          <p className="text-xs text-slate-400 mt-1">Degree-2 polynomial achieves R² = 0.9533 on 200 records</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Display Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-slate-50">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="PKR">PKR (₨)</option>
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
        <h3 className="font-semibold text-slate-800">Preferences</h3>

        {[
          { label: "Enable Notifications", sub: "Receive system alerts and model updates", value: notifications, set: setNotifications },
          { label: "Diminishing Returns Warning", sub: "Show alert when budgets exceed optimal thresholds", value: diminishing, set: setDiminishing },
        ].map(({ label, sub, value, set }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </div>
            <button
              onClick={() => set(!value)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${value ? "bg-emerald-500" : "bg-slate-200"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-6" : ""}`} />
            </button>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-2">
        <h3 className="font-semibold text-slate-800 mb-3">About</h3>
        {[
          ["Platform", "AdSales AI v1.0"],
          ["Algorithm", "Polynomial Regression (sklearn)"],
          ["Dataset", "advertising.csv · 200 records"],
          ["Model Accuracy", "R² = 0.9533"],
          ["Framework", "Next.js 14 · TypeScript · Tailwind CSS"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-slate-500">{k}</span>
            <span className="font-medium text-slate-700">{v}</span>
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-2xl font-semibold text-sm shadow transition-all duration-300 ${
          saved ? "bg-emerald-500 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"
        }`}
      >
        {saved ? "✓ Settings Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
