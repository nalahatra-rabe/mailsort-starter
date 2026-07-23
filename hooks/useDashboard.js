"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

function logout(router) {
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  router.replace("/");
}

export default function useDashboard(category) {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const messagesUrl = category
        ? `/api/messages?category=${encodeURIComponent(category)}`
        : "/api/messages";

      const [statsRes, messagesRes] = await Promise.all([
        fetch("/api/messages/stats"),
        fetch(messagesUrl),
      ]);

      if (statsRes.status === 401 || messagesRes.status === 401) {
        logout(router);
        return;
      }

      if (!statsRes.ok || !messagesRes.ok) {
        setError("Erreur lors du chargement des données.");
        return;
      }

      const [statsData, messagesData] = await Promise.all([
        statsRes.json(),
        messagesRes.json(),
      ]);

      setStats(statsData);
      setMessages(messagesData.messages);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }, [router, category]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateCategory(messageId, newCategory) {
    try {
      const res = await fetch(`/api/messages/${messageId}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });

      if (res.status === 401) {
        logout(router);
        return;
      }

      if (!res.ok) return;

      const { message: updated } = await res.json();

      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, category: updated.category } : m)),
      );

      setStats((prev) => {
        const oldCat = messages.find((m) => m.id === messageId)?.category;
        if (!prev || !oldCat) return prev;

        const next = { ...prev, byCategory: { ...prev.byCategory } };
        next.byCategory[oldCat] = (next.byCategory[oldCat] || 1) - 1;
        next.byCategory[newCategory] = (next.byCategory[newCategory] || 0) + 1;
        return next;
      });
    } catch {
      // silent
    }
  }

  function handleLogout() {
    logout(router);
  }

  return { stats, messages, loading, error, handleLogout, retry: load, updateCategory };
}
