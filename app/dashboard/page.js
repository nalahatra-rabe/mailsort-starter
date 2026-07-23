"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useDashboard from "@/hooks/useDashboard";
import DashboardHeader from "@/components/DashboardHeader";
import StatsGrid from "@/components/StatsGrid";
import MessageList from "@/components/MessageList";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("type") || null;
  const { stats, messages, loading, error, updatingIds, handleLogout, retry, updateCategory } =
    useDashboard(activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Chargement…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <button
            onClick={retry}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <DashboardHeader onLogout={handleLogout} />
      <StatsGrid stats={stats} activeCategory={activeCategory} />
      <MessageList messages={messages} activeCategory={activeCategory} onCategoryChange={updateCategory} updatingIds={updatingIds} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-slate-400">Chargement…</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
