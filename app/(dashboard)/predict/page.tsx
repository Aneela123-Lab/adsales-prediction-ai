"use client";

import { useState } from "react";
import { useApp } from "../../context/AppContext";

function predictSales(tv: number, radio: number, newspaper: number): number {
  const sales = 5.150943 + 
    0.076216 * tv - 
    0.031984 * radio - 
    0.001920 * newspaper - 
    0.000106 * (tv * tv) + 
    0.000418 * (tv * radio) - 
    0.000025 * (tv * newspaper) + 
    0.001448 * (radio * radio) + 
    0.000165 * (radio * newspaper) + 
    0.000085 * (newspaper * newspaper);
  return parseFloat(sales.toFixed(2));
}

function isDiminishingReturns(tv: number, radio: number, newspaper: number): boolean {
  return tv > 200 || radio > 40 || newspaper > 70;
}

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  color: string;
  icon: string;
  description: string;
}

function SliderInput({ id, label, value, min, max, onChange, color, icon, description }: SliderInputProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <div>
            <label htmlFor={id} className="font-semibold text-slate-800 text-sm block">
              {label}
            </label>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-slate-400 text-sm">$</span>
          <input
            id={id}
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
            className="custom-input w-20 text-right bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-slate-800 transition-shadow"
          />
          <span className="text-slate-400 text-sm">K</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 rounded-full appearance-none cursor-pointer ${color}`}
        style={{ accentColor: color === "bg-indigo-500" ? "#6366f1" : color === "bg-violet-500" ? "#8b5cf6" : "#0ea5e9" }}
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>${min}K</span>
        <span>${max}K</span>
      </div>
    </div>
  );
}

export default function PredictPage() {
  const { addPrediction } = useApp();
  const [tv, setTv] = useState(150);
  const [radio, setRadio] = useState(25);
  const [newspaper, setNewspaper] = useState(20);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setSubmitted(false);
    await new Promise((r) => setTimeout(r, 800)); // simulate processing
    const sales = predictSales(tv, radio, newspaper);
    setResult(sales);
    addPrediction({ tv, radio, newspaper, sales });
    setLoading(false);
    setSubmitted(true);
  };

  const diminishing = isDiminishingReturns(tv, radio, newspaper);
  const total = tv + radio + newspaper;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Sales Predictor</h2>
            <p className="text-violet-200 text-sm">Adjust budgets and click Predict</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input form */}
        <div className="lg:col-span-3 space-y-4">
          <SliderInput
            id="tv"
            label="TV Budget"
            value={tv}
            min={0}
            max={300}
            onChange={setTv}
            color="bg-indigo-500"
            icon="📺"
            description="Television advertising spend"
          />
          <SliderInput
            id="radio"
            label="Radio Budget"
            value={radio}
            min={0}
            max={50}
            onChange={setRadio}
            color="bg-violet-500"
            icon="📻"
            description="Radio advertising spend"
          />
          <SliderInput
            id="newspaper"
            label="Newspaper Budget"
            value={newspaper}
            min={0}
            max={100}
            onChange={setNewspaper}
            color="bg-sky-500"
            icon="📰"
            description="Print media advertising spend"
          />

          {/* Total budget bar */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-500 font-medium">Total Budget</span>
              <span className="font-bold text-slate-800">${total}K</span>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              <div className="bg-indigo-500 rounded-l-full transition-all duration-500" style={{ width: `${(tv / total) * 100 || 33}%` }} />
              <div className="bg-violet-500 transition-all duration-500" style={{ width: `${(radio / total) * 100 || 33}%` }} />
              <div className="bg-sky-500 rounded-r-full transition-all duration-500" style={{ width: `${(newspaper / total) * 100 || 34}%` }} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />TV</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />Radio</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />Newspaper</span>
            </div>
          </div>

          {/* Diminishing returns warning */}
          {diminishing && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="font-semibold text-amber-800 text-sm">Diminishing Returns Detected</p>
                <p className="text-amber-700 text-xs mt-1">
                  At higher budget levels, each additional dollar spent generates progressively less sales growth. The model accounts for this non-linear behaviour.
                </p>
              </div>
            </div>
          )}

          {/* Predict button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="predict-btn w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Calculating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Predict Sales
              </>
            )}
          </button>
        </div>

        {/* Result panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Result box */}
          <div className={`rounded-2xl p-6 flex-1 flex flex-col items-center justify-center text-center transition-all duration-500 ${
            submitted && result !== null
              ? "bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl result-glow animate-bounce-in"
              : "bg-white border border-slate-100 shadow-sm"
          }`}>
            {submitted && result !== null ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-medium mb-2">Predicted Sales</p>
                <p className="text-5xl font-extrabold mb-1">${result.toFixed(2)}M</p>
                <p className="text-white/60 text-xs mt-2">Based on your budget allocation</p>
                <div className="mt-4 w-full bg-white/10 rounded-xl p-3 text-left text-xs text-white/80">
                  <div className="grid grid-cols-2 gap-2">
                    <div>TV: <span className="font-bold text-white">${tv}K</span></div>
                    <div>Radio: <span className="font-bold text-white">${radio}K</span></div>
                    <div>Newspaper: <span className="font-bold text-white">${newspaper}K</span></div>
                    <div>Total: <span className="font-bold text-white">${total}K</span></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">Set your budgets and click</p>
                <p className="text-slate-600 font-semibold text-lg mt-1">Predict Sales</p>
                <p className="text-slate-300 text-xs mt-3">Results will appear here</p>
              </>
            )}
          </div>

          {/* Formula reference */}
          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">Formula</p>
            <code className="text-xs text-indigo-800 font-mono leading-relaxed block">
              Sales = 5.15<br />
              + 0.076(TV) - 0.032(Radio)<br />
              + 0.0004(TV × Radio)<br />
              + ... (Polynomial interaction terms)
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
