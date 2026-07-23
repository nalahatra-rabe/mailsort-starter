import { NextResponse } from "next/server";
import { getAllMessages } from "@/app/lib/store";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export async function GET() {
  const messages = getAllMessages();
  const stats = {};

  for (const message of messages) {
    stats[message.category] = (stats[message.category] || 0) + 1;
  }

  return NextResponse.json({
    total: messages.length,
    byCategory: stats,
  });
}
