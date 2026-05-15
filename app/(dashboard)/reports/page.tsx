"use client";

import { useApp } from "../../context/AppContext";

export default function ReportsPage() {
  const { predictions } = useApp();

  const handleExport = () => {
    const header = "TV ($K),Radio ($K),Newspaper ($K),Predicted Sales ($M),Date\n";
    const rows = predictions.map(p =>
      `${p.tv},${p.radio},${p.newspaper},${p.sales.toFixed(2)},${new Date(p.date).toLocaleDateString()}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "adsales_report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const total = predictions.length;
  const bestSales = total > 0 ? Math.max(...predictions.map(p => p.sales)) : 0;
  const bestPred = predictions.find(p => p.sales === bestSales);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Reports</h2>
          <p className="text-slate-400 text-sm">Export and review your prediction data</p>
        </div>
        <button
          onClick={handleExport}
          disabled={total === 0}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Summary report */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Summary Report</h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Predictions", value: total },
            { label: "Best Sales Result", value: total > 0 ? `$${bestSales.toFixed(2)}M` : "—" },
            { label: "Best TV Budget", value: bestPred ? `$${bestPred.tv}K` : "—" },
            { label: "Best Radio Budget", value: bestPred ? `$${bestPred.radio}K` : "—" },
            { label: "Model R²", value: "0.9533" },
            { label: "Algorithm", value: "Poly Reg." },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <dt className="text-xs text-slate-400 font-medium mb-1">{label}</dt>
              <dd className="text-lg font-bold text-slate-800">{String(value)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Data preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Data Preview</h3>
          <span className="text-xs text-slate-400">{total} rows</span>
        </div>
        {total === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <p className="text-4xl mb-3">📄</p>
            <p>No data to report yet. Make some predictions first.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                  {["TV ($K)", "Radio ($K)", "Newspaper ($K)", "Sales ($M)", "Date"].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {predictions.map(p => (
                  <tr key={p.id} className="table-row-hover">
                    <td className="px-5 py-3 font-medium text-slate-700">{p.tv}</td>
                    <td className="px-5 py-3 text-slate-600">{p.radio}</td>
                    <td className="px-5 py-3 text-slate-600">{p.newspaper}</td>
                    <td className="px-5 py-3 font-bold text-emerald-600">${p.sales.toFixed(2)}M</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{new Date(p.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
