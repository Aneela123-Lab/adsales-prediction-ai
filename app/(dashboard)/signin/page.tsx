"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    
    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      setDone(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header bar */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Sign In</h1>
            <p className="text-slate-400 text-sm mt-1">Access your AdSales AI account</p>
          </div>

          <div className="px-8 py-8">
            {done ? (
              <div className="text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800 text-lg">Signed in successfully!</p>
                <p className="text-slate-500 text-sm">Redirecting to dashboard…</p>
                <Link href="/dashboard" className="inline-block bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors text-sm">
                  Go to Dashboard →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                    <span>⚠️</span><span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="analyst@company.com"
                    className="custom-input w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="custom-input w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow"
                    />
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium">
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 accent-emerald-500" />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>Signing in…</>
                  ) : "Sign In →"}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/create-account" className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors">
                    Create account
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          AdSales AI · Secured Prediction Platform · v1.0
        </p>
      </div>
    </div>
  );
}
