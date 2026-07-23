import { NextResponse } from "next/server";
import raw from "@/data/messages.json";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export async function GET() {
  const stats = {};

  for (const message of raw) {
    stats[message.category] = (stats[message.category] || 0) + 1;
  }

  return NextResponse.json({
    total: raw.length,
    byCategory: stats,
  });
}
