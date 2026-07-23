import "./globals.css";

export const metadata = {
  title: "MailSort — Test technique",
  description: "Mini application de tri de messages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
