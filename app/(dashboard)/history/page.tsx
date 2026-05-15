"use client";

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Link from "next/link";

type SortKey = "date" | "tv" | "radio" | "newspaper" | "sales";

export default function HistoryPage() {
  const { predictions } = useApp();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState("");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSort(key, !sortAsc);
    else setSort(key, false);
  };

  const setSort = (key: SortKey, asc: boolean) => {
    setSortKey(key);
    setSortAsc(asc);
  };

  const filteredAndSorted = [...predictions]
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        String(p.tv).includes(q) ||
        String(p.radio).includes(q) ||
        String(p.newspaper).includes(q) ||
        String(p.sales).includes(q)
      );
    })
    .sort((a, b) => {
      let valA: number | string = sortKey === "date" ? a.date : a[sortKey];
      let valB: number | string = sortKey === "date" ? b.date : b[sortKey];
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-slate-300">
      {sortKey === col ? (sortAsc ? "↑" : "↓") : "↕"}
    </span>
  );

  const stats = predictions.length > 0 ? {
    max: Math.max(...predictions.map(p => p.sales)).toFixed(2),
    min: Math.min(...predictions.map(p => p.sales)).toFixed(2),
    avg: (predictions.reduce((s, p) => s + p.sales, 0) / predictions.length).toFixed(2),
  } : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary row */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Best Prediction", value: `$${stats.max}M`, icon: "🏆", color: "from-emerald-500 to-teal-600" },
            { label: "Average Sales", value: `$${stats.avg}M`, icon: "📊", color: "from-indigo-500 to-violet-600" },
            { label: "Lowest Result", value: `$${stats.min}M`, icon: "📉", color: "from-slate-500 to-slate-700" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className={`stat-card rounded-2xl p-4 bg-gradient-to-br ${color} text-white shadow-md`}>
              <p className="text-white/70 text-xs mb-1">{icon} {label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-slate-800">All Predictions</h3>
            <p className="text-xs text-slate-400">{predictions.length} record{predictions.length !== 1 ? "s" : ""} total</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 w-44"
              />
            </div>
            <Link
              href="/predict"
              className="predict-btn text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredAndSorted.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-5xl mb-4">{predictions.length === 0 ? "📋" : "🔍"}</p>
              <p className="text-slate-500 font-medium">
                {predictions.length === 0 ? "No predictions yet" : "No results match your search"}
              </p>
              {predictions.length === 0 && (
                <Link href="/predict" className="inline-block mt-4 text-indigo-600 text-sm font-medium hover:underline">
                  Make your first prediction →
                </Link>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  {[
                    { key: "tv", label: "TV ($K)" },
                    { key: "radio", label: "Radio ($K)" },
                    { key: "newspaper", label: "Newspaper ($K)" },
                    { key: "sales", label: "Sales ($M)" },
                    { key: "date", label: "Date" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key as SortKey)}
                      className="px-6 py-3 text-left font-semibold cursor-pointer hover:text-indigo-600 transition-colors select-none"
                    >
                      {label}<SortIcon col={key as SortKey} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAndSorted.map((p, i) => (
                  <tr key={p.id} className="table-row-hover transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                        <span className="font-medium text-slate-700">{p.tv}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                        <span className="text-slate-600">{p.radio}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
                        <span className="text-slate-600">{p.newspaper}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                        ${p.sales.toFixed(2)}M
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400 text-xs">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
