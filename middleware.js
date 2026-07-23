import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/lib/auth";

export function middleware(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
  }

  const token = authHeader.slice(7);

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/messages/:path*",
};
