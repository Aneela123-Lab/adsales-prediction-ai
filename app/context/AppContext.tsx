"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Prediction {
  id: string;
  tv: number;
  radio: number;
  newspaper: number;
  sales: number;
  date: string;
}

interface AppContextType {
  predictions: Prediction[];
  addPrediction: (p: Omit<Prediction, "id" | "date">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: "demo-1",
      tv: 200,
      radio: 30,
      newspaper: 15,
      sales: parseFloat((5.150943 + 0.076216 * 200 - 0.031984 * 30 - 0.001920 * 15 - 0.000106 * 40000 + 0.000418 * 6000 - 0.000025 * 3000 + 0.001448 * 900 + 0.000165 * 450 + 0.000085 * 225).toFixed(2)),
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo-2",
      tv: 100,
      radio: 20,
      newspaper: 10,
      sales: parseFloat((5.150943 + 0.076216 * 100 - 0.031984 * 20 - 0.001920 * 10 - 0.000106 * 10000 + 0.000418 * 2000 - 0.000025 * 1000 + 0.001448 * 400 + 0.000165 * 200 + 0.000085 * 100).toFixed(2)),
      date: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);

  const addPrediction = (p: Omit<Prediction, "id" | "date">) => {
    const newPred: Prediction = {
      ...p,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setPredictions((prev) => [newPred, ...prev]);
  };

  return (
    <AppContext.Provider value={{ predictions, addPrediction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
