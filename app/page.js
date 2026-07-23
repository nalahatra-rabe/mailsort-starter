export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "60px auto", padding: 24 }}>
      <h1 style={{ color: "#1e3a8a" }}>MailSort</h1>
      <p>
        Bienvenue sur le starter du test technique. Le dashboard est à
        construire — consultez le <code>README.md</code> pour les consignes.
      </p>
      <p style={{ color: "#64748b", fontSize: 14 }}>
        API disponible : <code>POST /api/auth/login</code> ·{" "}
        <code>GET /api/messages</code> ·{" "}
        <code>PATCH /api/messages/:id/category</code> ·{" "}
        <code>GET /api/messages/stats</code>
      </p>
    </main>
  );
}
