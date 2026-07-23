"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    async function load() {
      setLoading(true);

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

        const [statsData, messagesData] = await Promise.all([
          statsRes.json(),
          messagesRes.json(),
        ]);

        setStats(statsData);
        setMessages(messagesData.messages);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router, category]);

  function handleLogout() {
    logout(router);
  }

  return { stats, messages, loading, handleLogout };
}
