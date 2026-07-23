"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    router.replace("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Bienvenue sur MailSort
        </h1>
        <p className="text-slate-500 mb-8">
          Tableau de bord à construire.
        </p>
        <button
          onClick={handleLogout}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
