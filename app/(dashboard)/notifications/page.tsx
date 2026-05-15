"use client";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "success", title: "Model Accuracy Confirmed", body: "Your polynomial regression model achieved R² = 0.9533 on the test set.", time: "2 mins ago" },
    { id: 2, type: "info", title: "New Dataset Available", body: "An updated advertising.csv with Q2 2026 data is ready for re-training.", time: "1 hour ago" },
    { id: 3, type: "warning", title: "Diminishing Returns Alert", body: "Your last prediction used a TV budget above $200K — consider rebalancing.", time: "Yesterday" },
  ];
  const icons: Record<string, string> = { success: "✅", info: "ℹ️", warning: "⚠️" };
  const colors: Record<string, string> = {
    success: "border-l-emerald-500 bg-emerald-50",
    info: "border-l-sky-500 bg-sky-50",
    warning: "border-l-amber-500 bg-amber-50",
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-1">Notifications</h2>
        <p className="text-slate-400 text-sm">Stay updated on model performance and system alerts</p>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`bg-white rounded-2xl border-l-4 shadow-sm p-5 flex items-start gap-4 ${colors[n.type]}`}>
            <span className="text-2xl flex-shrink-0">{icons[n.type]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <p className="font-semibold text-slate-800 text-sm">{n.title}</p>
                <span className="text-xs text-slate-400 flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
