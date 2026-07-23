export const metadata = {
  title: "MailSort — Test technique",
  description: "Mini application de tri de messages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#f8fafc" }}>
        {children}
      </body>
    </html>
  );
}
