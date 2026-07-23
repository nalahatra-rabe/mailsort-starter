import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/app/lib/auth";

async function verifyToken(token) {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // API routes → vérifie l'en-tête Authorization
  if (pathname.startsWith("/api/messages")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
    }

    const valid = await verifyToken(authHeader.slice(7));
    if (!valid) {
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 });
    }

    return NextResponse.next();
  }

  // Routes protégées → vérifie le cookie
  const cookieToken = request.cookies.get("token")?.value;
  const isAuth = await verifyToken(cookieToken);

  // Dashboard → redirige vers / si non connecté
  if (pathname.startsWith("/dashboard")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Page d'accueil → redirige vers /dashboard si connecté
  if (pathname === "/") {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/messages/:path*"],
};
