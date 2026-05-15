"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type Step = "choose" | "email";

export default function CreateAccountPage() {
  const [step, setStep] = useState<Step>("choose");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ── helpers ── */
  const pwStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  };
  const strength = pwStrength(password);
  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-red-400", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"][strength];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!email.includes("@")) e.email = "Enter a valid email address.";
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (password !== confirm) e.confirm = "Passwords do not match.";
    if (!agree) e.agree = "You must accept the terms to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    
    if (res?.error) {
      setErrors({ email: "Error creating account. Please try again." });
    } else {
      setDone(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  };

  const handleOAuth = (provider: string) => {
    if (provider === "Google") {
      signIn("google", { callbackUrl: "/dashboard" });
    } else {
      alert(`"${provider}" sign-up would redirect to the OAuth provider. Connect NextAuth or your auth service to enable this.`);
    }
  };

  /* ── social providers ── */
  const providers = [
    {
      name: "Google",
      color: "hover:bg-red-50 hover:border-red-200",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
    },
    {
      name: "Apple",
      color: "hover:bg-slate-50 hover:border-slate-300",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
    },
    {
      name: "Microsoft",
      color: "hover:bg-blue-50 hover:border-blue-200",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#F25022" d="M1 1h10v10H1z"/>
          <path fill="#00A4EF" d="M13 1h10v10H13z"/>
          <path fill="#7FBA00" d="M1 13h10v10H1z"/>
          <path fill="#FFB900" d="M13 13h10v10H13z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      color: "hover:bg-slate-50 hover:border-slate-300",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #10b981 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="text-slate-400 text-sm mt-1">Join AdSales AI — free to get started</p>
            </div>
          </div>

          <div className="px-8 py-8">

            {/* ── SUCCESS STATE ── */}
            {done ? (
              <div className="text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-slate-800 text-xl">Account Created! 🎉</p>
                <p className="text-slate-500 text-sm">Welcome to AdSales AI, {name.split(" ")[0]}!</p>
                <Link href="/dashboard"
                  className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-2xl transition-colors shadow text-sm">
                  Go to Dashboard →
                </Link>
                <p className="text-xs text-slate-400">A confirmation email has been sent to {email}</p>
              </div>

            /* ── CHOOSE METHOD ── */
            ) : step === "choose" ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-slate-500 mb-5">Choose how you'd like to sign up</p>

                {/* Social providers */}
                <div className="grid grid-cols-2 gap-3">
                  {providers.map((p) => (
                    <button key={p.name} onClick={() => handleOAuth(p.name)}
                      className={`flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 transition-all duration-200 ${p.color}`}>
                      {p.icon}
                      {p.name}
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Email option */}
                <button onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3.5 rounded-2xl shadow transition-all duration-200 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Sign up with Email
                </button>

                <p className="text-center text-xs text-slate-400 pt-1">
                  By creating an account you agree to our{" "}
                  <span className="text-emerald-600 font-medium cursor-pointer hover:underline">Terms of Service</span> &amp;{" "}
                  <span className="text-emerald-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              </div>

            /* ── EMAIL FORM ── */
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <button type="button" onClick={() => setStep("choose")}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to options
                </button>

                {/* Full name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
                    className={`custom-input w-full border rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow ${errors.name ? "border-red-300" : "border-slate-200"}`} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@company.com"
                    className={`custom-input w-full border rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow ${errors.email ? "border-red-300" : "border-slate-200"}`} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                      className={`custom-input w-full border rounded-xl px-4 py-3 pr-14 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow ${errors.password ? "border-red-300" : "border-slate-200"}`} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600">
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`flex-1 h-1 rounded-full transition-colors duration-300 ${i <= strength ? strengthColor : "bg-slate-200"}`} />
                        ))}
                      </div>
                      <p className={`text-xs font-medium ${strength >= 3 ? "text-emerald-600" : strength >= 2 ? "text-amber-500" : "text-red-500"}`}>
                        {strengthLabel}
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter your password"
                    className={`custom-input w-full border rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50 placeholder-slate-300 transition-shadow ${errors.confirm ? "border-red-300" : confirm && confirm === password ? "border-emerald-300" : "border-slate-200"}`} />
                  {confirm && confirm === password && (
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Passwords match
                    </p>
                  )}
                  {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl border transition-colors ${errors.agree ? "border-red-200 bg-red-50" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}>
                  <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                    className="mt-0.5 accent-emerald-500 w-4 h-4 flex-shrink-0" />
                  <span className="text-xs text-slate-500 leading-relaxed">
                    I agree to the{" "}
                    <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">Terms of Service</span> and{" "}
                    <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                  </span>
                </label>
                {errors.agree && <p className="text-xs text-red-500 -mt-2">{errors.agree}</p>}

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>Creating account…</>
                  ) : "Create Account →"}
                </button>
              </form>
            )}

            {/* ── Already have an account ── */}
            {!done && (
              <p className="text-center text-xs text-slate-400 mt-6 pt-5 border-t border-slate-100">
                Already have an account?{" "}
                <Link href="/signin" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
                  Sign in →
                </Link>
              </p>
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
