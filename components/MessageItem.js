"use client";

import { useState } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS, formatDate } from "./constants";
import CategoryDropdown from "./CategoryDropdown";

export default function MessageItem({ message, onCategoryChange, updating }) {
  const [open, setOpen] = useState(false);

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
        <div className="flex flex-col items-end gap-2 shrink-0 relative">
          {updating ? (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
              Modification…
            </span>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className={`text-xs font-medium px-2 py-0.5 rounded-full cursor-pointer ${
                CATEGORY_COLORS[message.category] || "bg-slate-100 text-slate-600"
              }`}
            >
              {CATEGORY_LABELS[message.category] || message.category}
            </button>
          )}
          {open && (
            <CategoryDropdown
              current={message.category}
              onSelect={(cat) => {
                setOpen(false);
                onCategoryChange(message.id, cat);
              }}
              onClose={() => setOpen(false)}
            />
          )}
          <span className="text-xs text-slate-400">
            {formatDate(message.receivedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
