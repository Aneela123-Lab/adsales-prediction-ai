"use client";

import { useApp } from "../../context/AppContext";

function MetricCard({ title, value, sub, color, icon }: { title: string; value: string; sub: string; color: string; icon: string }) {
  return (
    <div className={`stat-card rounded-2xl p-6 text-white shadow-lg ${color} relative overflow-hidden`}>
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
      <p className="text-3xl mb-1">{icon}</p>
      <p className="text-white/70 text-xs font-medium mb-1">{title}</p>
      <p className="text-3xl font-extrabold">{value}</p>
      <p className="text-white/60 text-xs mt-1">{sub}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const { predictions } = useApp();
  const total = predictions.length;
  const avgSales = total > 0 ? (predictions.reduce((s, p) => s + p.sales, 0) / total).toFixed(2) : "0.00";
  const avgTV = total > 0 ? (predictions.reduce((s, p) => s + p.tv, 0) / total).toFixed(0) : "0";
  const avgRadio = total > 0 ? (predictions.reduce((s, p) => s + p.radio, 0) / total).toFixed(0) : "0";

  const channelShare = total > 0 ? {
    tv: ((predictions.reduce((s, p) => s + p.tv, 0) / predictions.reduce((s, p) => s + p.tv + p.radio + p.newspaper, 0)) * 100).toFixed(0),
    radio: ((predictions.reduce((s, p) => s + p.radio, 0) / predictions.reduce((s, p) => s + p.tv + p.radio + p.newspaper, 0)) * 100).toFixed(0),
    newspaper: ((predictions.reduce((s, p) => s + p.newspaper, 0) / predictions.reduce((s, p) => s + p.tv + p.radio + p.newspaper, 0)) * 100).toFixed(0),
  } : { tv: "63", radio: "26", newspaper: "11" };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-1">Analytics Overview</h2>
        <p className="text-teal-200 text-sm">Performance metrics across all your predictions</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard title="Total Runs" value={String(total)} sub="All-time predictions" color="bg-gradient-to-br from-slate-600 to-slate-800" icon="🔢" />
        <MetricCard title="Avg Sales" value={`$${avgSales}M`} sub="Mean predicted revenue" color="bg-gradient-to-br from-teal-500 to-emerald-700" icon="💰" />
        <MetricCard title="Avg TV Budget" value={`$${avgTV}K`} sub="Per prediction" color="bg-gradient-to-br from-indigo-500 to-indigo-700" icon="📺" />
        <MetricCard title="Avg Radio Budget" value={`$${avgRadio}K`} sub="Per prediction" color="bg-gradient-to-br from-violet-500 to-violet-700" icon="📻" />
      </div>

      {/* Channel share */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-5">Average Budget Channel Distribution</h3>
        <div className="space-y-4">
          {[
            { label: "TV", pct: channelShare.tv, color: "bg-indigo-500" },
            { label: "Radio", pct: channelShare.radio, color: "bg-violet-500" },
            { label: "Newspaper", pct: channelShare.newspaper, color: "bg-sky-500" },
          ].map(({ label, pct, color }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="w-20 text-sm text-slate-500 font-medium">{label}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
              <span className="w-12 text-sm font-bold text-slate-700 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Model performance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "R² Score", value: "0.9533", desc: "Model fit quality", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Polynomial Degree", value: "2", desc: "Feature complexity", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "Training Records", value: "200", desc: "Dataset size", color: "text-teal-600", bg: "bg-teal-50 border-teal-100" },
        ].map(({ label, value, desc, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
            <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
