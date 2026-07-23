export default function StatCard({ label, count, className }) {
  return (
    <div className={`rounded-xl px-4 py-3 shadow-sm ${className}`}>
      <p className="text-xs opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">{count}</p>
    </div>
  );
}
