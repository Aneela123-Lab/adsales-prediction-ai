"use client";

import { useApp } from "../../context/AppContext";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  trend?: string;
}

function StatCard({ title, value, subtitle, icon, gradient, trend }: StatCardProps) {
  return (
    <div className={`stat-card rounded-2xl p-6 text-white shadow-lg ${gradient} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-8 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
            {icon}
          </div>
          {trend && (
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-white/60 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function BudgetBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-4">
      <span className="w-20 text-sm text-slate-500 text-right">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 text-sm font-semibold text-slate-700">${value}K</span>
    </div>
  );
}

export default function DashboardPage() {
  const { predictions } = useApp();

  const totalPredictions = predictions.length;
  const avgSales = totalPredictions > 0
    ? (predictions.reduce((s, p) => s + p.sales, 0) / totalPredictions).toFixed(2)
    : "0.00";
  const lastSales = totalPredictions > 0 ? predictions[0].sales.toFixed(2) : "—";
  const lastPred = predictions[0];
  const recent = predictions.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back! 👋</h2>
            <p className="text-indigo-200 text-sm">Your advertising sales prediction engine is ready.</p>
          </div>
          <Link
            href="/predict"
            className="bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-xl shadow hover:shadow-md hover:bg-indigo-50 transition-all duration-200 text-sm"
          >
            + New Prediction
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Predictions"
          value={totalPredictions}
          subtitle="All-time predictions made"
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
          trend="+Active"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <StatCard
          title="Average Sales"
          value={`$${avgSales}M`}
          subtitle="Mean predicted sales revenue"
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
          trend="Avg"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Last Result"
          value={lastPred ? `$${lastSales}M` : "—"}
          subtitle={lastPred ? `TV $${lastPred.tv}K · Radio $${lastPred.radio}K` : "No predictions yet"}
          gradient="bg-gradient-to-br from-sky-500 to-cyan-700"
          trend="Latest"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent predictions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Recent Predictions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last {Math.min(5, totalPredictions)} entries</p>
            </div>
            <Link href="/history" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recent.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-400">
                <p className="mb-2 text-4xl">📊</p>
                <p>No predictions yet. Make your first one!</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-semibold">TV ($K)</th>
                    <th className="px-6 py-3 text-left font-semibold">Radio ($K)</th>
                    <th className="px-6 py-3 text-left font-semibold">News ($K)</th>
                    <th className="px-6 py-3 text-left font-semibold">Sales ($M)</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recent.map((p) => (
                    <tr key={p.id} className="table-row-hover transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-700">{p.tv}</td>
                      <td className="px-6 py-3 text-slate-600">{p.radio}</td>
                      <td className="px-6 py-3 text-slate-600">{p.newspaper}</td>
                      <td className="px-6 py-3">
                        <span className="font-bold text-indigo-600">${p.sales.toFixed(2)}M</span>
                      </td>
                      <td className="px-6 py-3 text-slate-400 text-xs">
                        {new Date(p.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Budget breakdown of last prediction */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-1">Last Budget Split</h3>
          <p className="text-xs text-slate-400 mb-6">Budget allocation of most recent prediction</p>
          {lastPred ? (
            <div className="space-y-4">
              <BudgetBar label="TV" value={lastPred.tv} max={300} color="bg-indigo-500" />
              <BudgetBar label="Radio" value={lastPred.radio} max={50} color="bg-violet-500" />
              <BudgetBar label="Newspaper" value={lastPred.newspaper} max={100} color="bg-sky-500" />
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Predicted Sales</p>
                  <p className="text-xl font-bold gradient-text">${lastPred.sales.toFixed(2)}M</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400">
              <p className="text-3xl mb-2">💡</p>
              <p className="text-sm">Make a prediction first</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick formula card */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📐</span>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 mb-2">Prediction Formula</h3>
            <code className="text-sm text-indigo-700 bg-indigo-100 px-4 py-2 rounded-lg block font-mono">
              Sales = 3 + (0.04 × TV) + (0.3 × Radio) + (0.01 × Newspaper)
            </code>
            <p className="text-xs text-indigo-500 mt-2">Based on polynomial regression trained on 200 real advertising records · R² = 0.9533</p>
          </div>
        </div>
      </div>
    </div>
  );
}
