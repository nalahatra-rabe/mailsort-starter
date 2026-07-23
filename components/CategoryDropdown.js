"use client";

import { useEffect, useRef } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS, VALID_CATEGORIES } from "./constants";

export default function CategoryDropdown({ current, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1 z-50 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1"
    >
      {VALID_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          disabled={cat === current}
          className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 cursor-pointer ${
            cat === current
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              CATEGORY_COLORS[cat]?.split(" ")[0] || "bg-slate-300"
            }`}
          />
          {CATEGORY_LABELS[cat] || cat}
        </button>
      ))}
    </div>
  );
}
