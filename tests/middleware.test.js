import { describe, it, expect, vi, beforeEach } from "vitest";
import { SignJWT } from "jose";

const { mockJson, mockNext, mockRedirect } = vi.hoisted(() => ({
  mockJson: vi.fn(() => ({ kind: "json" })),
  mockNext: vi.fn(() => ({ kind: "next" })),
  mockRedirect: vi.fn((url) => ({ kind: "redirect", url })),
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: mockJson,
    next: mockNext,
    redirect: mockRedirect,
  },
}));

vi.mock("@/app/lib/auth", () => ({
  JWT_SECRET: "test-secret",
}));

import { NextResponse } from "next/server";
import { middleware } from "../middleware";

function createRequest({ pathname, authHeader, cookieToken }) {
  return {
    nextUrl: { pathname },
    url: `http://localhost${pathname}`,
    headers: { get: vi.fn((name) => (name === "authorization" ? authHeader ?? null : null)) },
    cookies: { get: vi.fn((name) => (name === "token" && cookieToken ? { value: cookieToken } : undefined)) },
  };
}

async function validToken() {
  const secret = new TextEncoder().encode("test-secret");
  return await new SignJWT({ sub: "test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

describe("middleware — /api/messages/* (token en en-tête)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne 401 sans Authorization header", async () => {
    await middleware(createRequest({ pathname: "/api/messages" }));

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Authentification requise" },
      { status: 401 },
    );
  });

  it("retourne 401 avec un token invalide", async () => {
    await middleware(createRequest({ pathname: "/api/messages", authHeader: "Bearer invalid" }));

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Token invalide ou expiré" },
      { status: 401 },
    );
  });

  it("laisse passer avec un token valide", async () => {
    const token = await validToken();
    await middleware(createRequest({ pathname: "/api/messages", authHeader: `Bearer ${token}` }));

    expect(NextResponse.next).toHaveBeenCalledOnce();
  });

  it("laisse passer avec un token valide dans le cookie", async () => {
    const token = await validToken();
    await middleware(createRequest({ pathname: "/api/messages", cookieToken: token }));

    expect(NextResponse.next).toHaveBeenCalledOnce();
  });

  it("retourne 401 si cookie token invalide", async () => {
    await middleware(createRequest({ pathname: "/api/messages", cookieToken: "bad" }));

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Token invalide ou expiré" },
      { status: 401 },
    );
  });
});

describe("middleware — / (page d'accueil)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("laisse passer si pas de cookie token", async () => {
    await middleware(createRequest({ pathname: "/" }));

    expect(NextResponse.next).toHaveBeenCalledOnce();
  });

  it("redirige vers /dashboard si cookie token valide", async () => {
    const token = await validToken();
    await middleware(createRequest({ pathname: "/", cookieToken: token }));

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/dashboard", "http://localhost/"),
    );
  });

  it("laisse passer si cookie token invalide", async () => {
    await middleware(createRequest({ pathname: "/", cookieToken: "bad-token" }));

    expect(NextResponse.next).toHaveBeenCalledOnce();
  });
});

describe("middleware — /dashboard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("redirige vers / si pas de cookie token", async () => {
    await middleware(createRequest({ pathname: "/dashboard" }));

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/", "http://localhost/"),
    );
  });

  it("laisse passer si cookie token valide", async () => {
    const token = await validToken();
    await middleware(createRequest({ pathname: "/dashboard", cookieToken: token }));

    expect(NextResponse.next).toHaveBeenCalledOnce();
  });

  it("redirige vers / si cookie token invalide", async () => {
    await middleware(createRequest({ pathname: "/dashboard", cookieToken: "bad-token" }));

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/", "http://localhost/"),
    );
  });
});
