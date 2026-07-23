import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/lib/auth";

// Identifiants de démonstration — NE PAS MODIFIER
// login: admin@mailsort.test / password: mailsort2026
const DEMO_USER = { email: "admin@mailsort.test", password: "mailsort2026" };

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: "2h" });
    return NextResponse.json({ token });
  } catch (e) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
