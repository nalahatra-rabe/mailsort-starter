import { NextResponse } from "next/server";
import { getAllMessages } from "@/app/lib/store";

// GET /api/messages
// GET /api/messages?category=facture
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = getAllMessages();

  if (category) {
    result = result.filter((m) => m.category.includes(category));
  }

  result = [...result].sort(
    (a, b) => new Date(b.receivedAt) - new Date(a.receivedAt)
  );

  return NextResponse.json({ count: result.length, messages: result });
}
