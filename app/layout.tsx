import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import SessionProviderContext from "./context/SessionProviderContext";

export const metadata: Metadata = {
  title: "AdSales AI — Advertising Sales Prediction System",
  description:
    "Predict advertising sales using polynomial regression. Analyze TV, Radio, and Newspaper budget impact on sales.",
  keywords: "advertising, sales prediction, machine learning, polynomial regression",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProviderContext>
          <AppProvider>{children}</AppProvider>
        </SessionProviderContext>
      </body>
    </html>
  );
}
