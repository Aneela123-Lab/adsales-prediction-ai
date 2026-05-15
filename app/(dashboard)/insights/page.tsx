"use client";

const concepts = [
  {
    icon: "📈",
    title: "Linear vs Non-Linear Growth",
    color: "from-indigo-500 to-indigo-700",
    text: "Simple linear regression assumes that each extra dollar of advertising always generates the same sales increase. In reality, advertising effectiveness changes at different spend levels.",
    detail: "Polynomial regression captures these curves, giving significantly better predictions (R² = 0.95 vs ~0.89 for linear).",
  },
  {
    icon: "📉",
    title: "Diminishing Returns Effect",
    color: "from-violet-500 to-purple-700",
    text: "Sales increase with budget — but they slow down at higher spending levels. The 10th $10K spent on TV generates far less new sales than the 1st $10K.",
    detail: "This phenomenon is called 'diminishing marginal returns' and is one of the core truths of advertising economics.",
  },
  {
    icon: "📺",
    title: "TV Has the Highest Impact",
    color: "from-sky-500 to-cyan-700",
    text: "Among the three channels, Radio has the highest per-dollar return (coefficient 0.30), followed by TV (0.04). Newspaper has minimal impact (0.01).",
    detail: "Radio advertising in this dataset generates 7.5× more sales per $1K spent compared to TV.",
  },
  {
    icon: "🔢",
    title: "Polynomial Degree 2",
    color: "from-emerald-500 to-teal-700",
    text: "The model uses degree-2 polynomial features — meaning it considers not just the raw budgets but also their squares and cross-products (e.g. TV × Radio).",
    detail: "This produces 10 features from just 3 inputs, allowing the model to capture complex interactions between channels.",
  },
];

const coefficients = [
  { feature: "Intercept", value: "5.15", label: "Base sales (no advertising)", color: "bg-slate-500" },
  { feature: "TV", value: "0.076", label: "Direct TV effect", color: "bg-indigo-500" },
  { feature: "Radio", value: "-0.032", label: "Direct Radio effect (overridden by synergy)", color: "bg-violet-500" },
  { feature: "Newspaper", value: "-0.002", label: "Direct Newspaper effect", color: "bg-sky-500" },
  { feature: "TV²", value: "-0.0001", label: "TV diminishing returns", color: "bg-rose-400" },
  { feature: "TV × Radio", value: "0.0004", label: "TV-Radio synergy bonus 🔑", color: "bg-emerald-500" },
  { feature: "Radio²", value: "0.0014", label: "Radio compounding effect", color: "bg-amber-500" },
];

function CurveChart() {
  // SVG approximation of sales curve (diminishing returns)
  const w = 400, h = 150;
  const points = Array.from({ length: 50 }, (_, i) => {
    const tv = (i / 49) * 300;
    const sales = 3 + 0.04 * tv + 0.3 * 25 + 0.01 * 20 - 0.0001 * tv * tv;
    return { x: (i / 49) * w, y: h - (sales / 25) * h };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${Math.max(5, p.y).toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" y1={h * f} x2={w} y2={h * f} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
      ))}
      {/* Area fill */}
      <path d={areaD} fill="url(#curveGrad)" />
      {/* Curve */}
      <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Diminishing returns marker */}
      <line x1="240" y1="0" x2="240" y2={h} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="245" y="20" fill="#f59e0b" fontSize="9" fontWeight="600">Diminishing Returns</text>
      {/* Axis labels */}
      <text x="5" y={h - 5} fill="#94a3b8" fontSize="9">$0</text>
      <text x={w - 30} y={h - 5} fill="#94a3b8" fontSize="9">$300K</text>
      <text x="5" y="12" fill="#94a3b8" fontSize="9">Sales ↑</text>
    </svg>
  );
}

export default function InsightsPage() {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
            Model R² = 0.9533 · Degree-2 Polynomial
          </div>
          <h2 className="text-3xl font-bold mb-3">How the Model Works</h2>
          <p className="text-indigo-200 text-base leading-relaxed">
            Sales increase with advertising budget — but they <strong className="text-white">slow down at higher spending levels</strong>.
            This is called <em>diminishing returns</em>, and our Polynomial Regression model captures exactly this behaviour.
          </p>
        </div>
      </div>

      {/* Curve Visualization */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-1 text-lg">TV Budget vs Sales (Curved Relationship)</h3>
        <p className="text-sm text-slate-400 mb-5">Notice how the curve flattens at higher TV budgets — this is diminishing returns in action.</p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <CurveChart />
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-indigo-500 inline-block" />
            Predicted Sales (varying TV, Radio=$25K, Newspaper=$20K)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-amber-400 inline-block" style={{ borderTop: "2px dashed #f59e0b", background: "none" }} />
            Diminishing returns zone begins here
          </span>
        </div>
      </div>

      {/* Concept cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {concepts.map((c) => (
          <div key={c.title} className="stat-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${c.color}`} />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{c.icon}</span>
                <h4 className="font-semibold text-slate-800">{c.title}</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{c.text}</p>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-slate-500 text-xs leading-relaxed">{c.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coefficients table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Model Coefficients</h3>
          <p className="text-xs text-slate-400 mt-0.5">Trained on 200 advertising records · sklearn PolynomialFeatures(degree=2)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-semibold">Feature</th>
                <th className="px-6 py-3 text-left font-semibold">Coefficient</th>
                <th className="px-6 py-3 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coefficients.map((c) => (
                <tr key={c.feature} className="table-row-hover">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-5 rounded ${c.color} flex-shrink-0`} />
                      <code className="font-mono text-sm font-semibold text-slate-700">{c.feature}</code>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`font-bold font-mono ${parseFloat(c.value) >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                      {c.value}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 text-xs">{c.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key takeaway */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center flex-shrink-0 text-2xl">
          💡
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 mb-2">Key Takeaway</h4>
          <p className="text-indigo-800 text-sm leading-relaxed">
            <strong>Radio advertising gives the best return per dollar</strong> in this dataset, but TV commands larger absolute budgets.
            The model reveals that <strong>TV × Radio synergy</strong> (spending on both together) boosts results beyond what either channel achieves alone.
            Diminishing returns kick in for TV spending above ~$200K.
          </p>
        </div>
      </div>
    </div>
  );
}
