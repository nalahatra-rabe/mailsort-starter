import { CATEGORY_LABELS, CATEGORY_COLORS, formatDate } from "./constants";

export default function MessageItem({ message }) {
  return (
    <div className="px-5 py-4 hover:bg-slate-50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900 truncate">
            {message.subject}
          </p>
          <p className="text-sm text-slate-500 mt-0.5">
            {message.from.name} &lt;{message.from.email}&gt;
          </p>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">
            {message.body}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              CATEGORY_COLORS[message.category] || "bg-slate-100 text-slate-600"
            }`}
          >
            {CATEGORY_LABELS[message.category] || message.category}
          </span>
          <span className="text-xs text-slate-400">
            {formatDate(message.receivedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
