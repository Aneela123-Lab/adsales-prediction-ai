"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":      { title: "Dashboard",           subtitle: "Overview of your prediction activity" },
  "/predict":        { title: "Predict Sales",        subtitle: "Enter budgets to forecast advertising sales" },
  "/history":        { title: "Prediction History",   subtitle: "All your past predictions at a glance" },
  "/insights":       { title: "Model Insights",       subtitle: "Understand the polynomial regression model" },
  "/analytics":      { title: "Analytics",            subtitle: "Deep-dive metrics across all predictions" },
  "/reports":        { title: "Reports",              subtitle: "Export and review your prediction data" },
  "/notifications":  { title: "Notifications",        subtitle: "System alerts and model performance updates" },
  "/settings":       { title: "Settings",             subtitle: "Configure your prediction platform" },
  "/signin":         { title: "Sign In",              subtitle: "Access your AdSales AI account" },
  "/create-account": { title: "Create Account",       subtitle: "Join AdSales AI — free to get started" },
};

export default function Navbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "AdSales AI", subtitle: "" };
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header className="glass sticky top-0 z-30 border-b border-slate-200/80 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-xl font-bold text-slate-800">{page.title}</h1>
          <p className="text-sm text-slate-500 hidden sm:block">{page.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date badge */}
          <div className="hidden md:flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-indigo-600 font-medium">{dateStr}</span>
          </div>

          {/* Model badge */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
            <span className="text-xs text-emerald-700 font-medium">Model R² = 0.95</span>
          </div>
        </div>
      </div>
    </header>
  );
}
