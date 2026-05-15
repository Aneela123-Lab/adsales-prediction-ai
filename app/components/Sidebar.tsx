"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const mainNav = [
  {
    href: "/dashboard",
    label: "Dashboard",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/predict",
    label: "Predict Sales",
    badge: "AI",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    href: "/history",
    label: "History",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: "/insights",
    label: "Model Insights",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/analytics",
    label: "Analytics",
    badge: "New",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/reports",
    label: "Reports",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const toolsNav = [
  {
    href: "/notifications",
    label: "Notifications",
    badge: "3",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/signin",
    label: "Sign In / Account",
    badge: null,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

function NavItem({ item, isActive, onClick }: {
  item: typeof mainNav[0];
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
        isActive
          ? "bg-white/15 text-white font-semibold shadow-inner border border-white/10"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"}`}>
        {item.icon}
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
          item.badge === "New" ? "bg-emerald-400 text-emerald-900" :
          item.badge === "AI"  ? "bg-violet-400 text-violet-900" :
          "bg-red-500 text-white"
        }`}>
          {item.badge}
        </span>
      )}
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  const { data: session } = useSession();

  const SidebarContent = () => (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "linear-gradient(180deg,#0f172a 0%,#1e293b 60%,#0f172a 100%)" }}>

      {/* ── Logo ─────────────────────────────── */}
      <div className="px-5 pt-6 pb-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm leading-tight">AdSales AI</p>
            <p className="text-[11px] text-slate-400 truncate">Prediction Platform</p>
          </div>
        </div>

        {/* Live status */}
        <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-[11px] text-emerald-300 font-medium">Model Active · R² = 0.9533</span>
        </div>
      </div>

      {/* ── Scrollable nav ───────────────────── */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin">

        {/* Core section */}
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 mb-2">Core</p>
          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <NavItem key={item.href} item={item} isActive={pathname === item.href} onClick={close} />
            ))}
          </div>
        </div>

        {/* Tools section */}
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 mb-2">Tools &amp; Account</p>
          <div className="space-y-0.5">
            {toolsNav.map((item) => (
              <NavItem key={item.href} item={item} isActive={pathname === item.href} onClick={close} />
            ))}
          </div>
        </div>

        {/* Quick stats widget */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Stats</p>
          <div className="space-y-2">
            {[
              { label: "Model Accuracy", value: "95.3%", bar: 0.953, color: "bg-emerald-400" },
              { label: "Avg Sales", value: "$16.6M",  bar: 0.66,  color: "bg-teal-400" },
              { label: "Data Points",  value: "200",   bar: 0.50,  color: "bg-sky-400" },
            ].map(({ label, value, bar, color }) => (
              <div key={label}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${bar * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help card */}
        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💬</span>
            <p className="text-xs font-semibold text-white">Need Help?</p>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Contact our data science team for custom model tuning or enterprise solutions.
          </p>
          <a data-id="mailto-support-button" href="mailto:aneelaarain279@gmail.com" className="w-full block text-center py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-semibold text-white transition-colors duration-200">
            Email aneelaarain279@gmail.com
          </a>
        </div>
      </nav>

      {/* ── User footer ──────────────────────── */}
      <div className="border-t border-white/5 px-4 py-4">
        {session ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow flex-shrink-0 uppercase">
                {session.user?.name?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">{session.user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{session.user?.email}</p>
              </div>
              <Link href="/settings" className="text-slate-500 hover:text-white transition-colors p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
            <button onClick={() => signOut()} className="w-full py-1.5 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors duration-200">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-dashed border-slate-500 flex items-center justify-center font-bold text-slate-500 text-sm shadow flex-shrink-0">
              ?
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-tight truncate">Guest</p>
              <p className="text-[11px] text-slate-400 truncate">Not signed in</p>
            </div>
            <Link href="/signin" className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-40 shadow-2xl overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile burger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-slate-800 text-white shadow-lg flex items-center justify-center border border-slate-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <aside className="relative w-64 flex flex-col shadow-2xl animate-slide-up">
            <button onClick={close} className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
