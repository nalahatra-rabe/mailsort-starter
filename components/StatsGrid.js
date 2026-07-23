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
      {[{ cat: null, label: "Total", count: stats.total }, ...Object.entries(stats.byCategory).map(([cat, count]) => ({ cat, label: CATEGORY_LABELS[cat] || cat, count }))].map(({ cat, label, count }) => {
        const isActive = cat === activeCategory || (cat === null && !activeCategory);

        return (
          <button
            key={cat ?? "total"}
            onClick={() => selectCategory(cat)}
            className="text-left cursor-pointer"
          >
            <StatCard
              label={label}
              count={count}
              className={`transition-shadow hover:shadow-md ${
                isActive
                  ? "bg-blue-900 text-white"
                  : "bg-white border border-slate-200 text-slate-800"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
