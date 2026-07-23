"use client";

import useDashboard from "@/hooks/useDashboard";
import DashboardHeader from "@/components/DashboardHeader";
import StatsGrid from "@/components/StatsGrid";
import MessageList from "@/components/MessageList";

export default function DashboardPage() {
  const { stats, messages, loading, handleLogout } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <DashboardHeader onLogout={handleLogout} />
      <StatsGrid stats={stats} />
      <MessageList messages={messages} />
    </div>
  );
}
