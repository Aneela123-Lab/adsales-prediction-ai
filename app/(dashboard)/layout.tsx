import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      {/* Main content area — offset by sidebar width on desktop */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-100">
          AdSales AI · Polynomial Regression · R² = 0.9533
        </footer>
      </div>
    </div>
  );
}
