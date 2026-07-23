"use client";

import { useRouter } from "next/navigation";
import StatCard from "@/components/StatCard";
import { CATEGORY_LABELS } from "@/components/constants";

export default function StatsGrid({ stats, activeCategory }) {
  const router = useRouter();

  if (!stats) return null;

  function selectCategory(cat) {
    router.push(cat ? `/dashboard?type=${cat}` : "/dashboard");
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <button
        onClick={() => selectCategory(null)}
        className="text-left cursor-pointer"
      >
        <StatCard
          label="Total"
          count={stats.total}
          className={`transition-shadow hover:shadow-md ${
            !activeCategory
              ? "bg-blue-900 text-white ring-2 ring-blue-400"
              : "bg-blue-900 text-white"
          }`}
        />
      </button>

      {Object.entries(stats.byCategory).map(([cat, count]) => (
        <button
          key={cat}
          onClick={() => selectCategory(cat)}
          className="text-left cursor-pointer"
        >
          <StatCard
            label={CATEGORY_LABELS[cat] || cat}
            count={count}
            className="bg-white border border-slate-200 text-slate-800 transition-shadow hover:shadow-md"
          />
        </button>
      ))}
    </div>
  );
}
