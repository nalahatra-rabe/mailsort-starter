import { NextResponse } from "next/server";
import {
  getMessageById,
  updateMessageCategory,
  VALID_CATEGORIES,
} from "@/app/lib/store";

// PATCH /api/messages/:id/category  body: { "category": "facture" }
export async function PATCH(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON attendu" }, { status: 400 });
  }

  const { category } = body;

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: `Catégorie invalide. Valeurs possibles : ${VALID_CATEGORIES.join(", ")}` },
      { status: 400 }
    );
  }

  if (!getMessageById(id)) {
    return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
  }

  const updated = updateMessageCategory(id, category);
  return NextResponse.json({ message: updated });
}
