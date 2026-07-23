export default function DashboardHeader({ onLogout }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-blue-900">MailSort</h1>
      <button
        onClick={onLogout}
        className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
      >
        Se déconnecter
      </button>
    </div>
  );
}
