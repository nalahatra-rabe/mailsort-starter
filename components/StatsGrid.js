import StatCard from "@/components/StatCard";
import { CATEGORY_LABELS } from "@/components/constants";

export default function StatsGrid({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Total"
        count={stats.total}
        className="bg-blue-900 text-white"
      />
      {Object.entries(stats.byCategory).map(([cat, count]) => (
        <StatCard
          key={cat}
          label={CATEGORY_LABELS[cat] || cat}
          count={count}
          className="bg-white border border-slate-200 text-slate-800"
        />
      ))}
    </div>
  );
}
