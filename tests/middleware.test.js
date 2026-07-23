import { describe, it, expect, vi, beforeEach } from 'vitest'
import jwt from 'jsonwebtoken'

const { mockJson, mockNext } = vi.hoisted(() => ({
  mockJson: vi.fn(),
  mockNext: vi.fn(),
}))

vi.mock('next/server', () => ({
  NextResponse: {
    json: mockJson,
    next: mockNext,
  },
}))

vi.mock('@/app/lib/auth', () => ({
  JWT_SECRET: 'test-secret',
}))

import { NextResponse } from 'next/server'
import { middleware } from '../middleware'

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when no Authorization header', () => {
    const request = { headers: { get: vi.fn().mockReturnValue(null) } }

    middleware(request)

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Authentification requise' },
      { status: 401 },
    )
  })

  it('returns 401 when token is invalid', () => {
    const request = { headers: { get: vi.fn().mockReturnValue('Bearer invalid_token') } }

    middleware(request)

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Token invalide ou expiré' },
      { status: 401 },
    )
  })

  it('calls NextResponse.next() when token is valid', () => {
    const token = jwt.sign({ sub: 'test' }, 'test-secret')
    const request = { headers: { get: vi.fn().mockReturnValue(`Bearer ${token}`) } }

    middleware(request)

    expect(NextResponse.next).toHaveBeenCalledOnce()
  })
})
