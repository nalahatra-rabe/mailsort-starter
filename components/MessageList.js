"use client";

import { useRouter } from "next/navigation";
import MessageItem from "@/components/MessageItem";
import { CATEGORY_LABELS } from "@/components/constants";

export default function MessageList({ messages, activeCategory, onCategoryChange, updatingIds }) {
  const router = useRouter();

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">
          {activeCategory
            ? `${CATEGORY_LABELS[activeCategory] || activeCategory} (${messages.length})`
            : `Messages (${messages.length})`}
        </h2>
        {activeCategory && (
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="px-5 py-12 text-center text-slate-400">
          <p className="text-lg mb-1">Aucun message</p>
          <p className="text-sm">
            {activeCategory
              ? "Aucun message dans cette catégorie."
              : "Aucun message à afficher."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              onCategoryChange={onCategoryChange}
              updating={updatingIds.has(msg.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
