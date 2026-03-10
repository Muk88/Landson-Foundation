import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { validateJWT, isAdmin } from '@/lib/jwt-utils'

/**
 * Enhanced authentication middleware with JWT validation
 */
export async function withAuth(
    request: NextRequest,
    handler: (request: NextRequest, user: any) => Promise<NextResponse>,
    requireAdmin: boolean = true
) {
    try {
        // Validate JWT token
        const { valid, user, error } = await validateJWT()

        if (!valid || !user) {
            return NextResponse.json(
                { error: error || 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        // Check admin role if required
        if (requireAdmin) {
            const hasAdminRole = await isAdmin()

            if (!hasAdminRole) {
                return NextResponse.json(
                    { error: 'Forbidden - Admin access required' },
                    { status: 403 }
                )
            }
        }

        // Call the handler with the authenticated user
        return await handler(request, user)
    } catch (error: any) {
        console.error('Auth middleware error:', error)
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        )
    }
}

/**
 * Verify admin session for client-side route protection
 */
export async function verifyAdminSession(): Promise<{ authenticated: boolean; user: any | null }> {
    const { valid, user } = await validateJWT()

    if (!valid || !user) {
        return { authenticated: false, user: null }
    }

    const hasAdminRole = await isAdmin()

    return { authenticated: hasAdminRole, user: hasAdminRole ? user : null }
}
