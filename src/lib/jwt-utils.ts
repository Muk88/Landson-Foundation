/**
 * JWT Utilities
 * Helper functions for JWT token validation and management
 */

import { createClient } from '@/lib/supabase'

export interface JWTPayload {
    sub: string // User ID
    email?: string
    role?: string
    exp?: number
    iat?: number
}

/**
 * Validate JWT token from Supabase
 */
export async function validateJWT(): Promise<{ valid: boolean; user: any | null; error?: string }> {
    try {
        const supabase = createClient()

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
            return { valid: false, user: null, error: sessionError.message }
        }

        if (!session) {
            return { valid: false, user: null, error: 'No active session' }
        }

        // Verify the user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return { valid: false, user: null, error: 'Invalid user' }
        }

        // Check token expiration
        const expiresAt = session.expires_at
        if (expiresAt && expiresAt * 1000 < Date.now()) {
            return { valid: false, user: null, error: 'Token expired' }
        }

        return { valid: true, user }
    } catch (error: any) {
        return { valid: false, user: null, error: error.message }
    }
}

/**
 * Refresh the current session token
 */
export async function refreshToken(): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = createClient()

        const { data, error } = await supabase.auth.refreshSession()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

/**
 * Check if user has admin role
 * Note: You may need to customize this based on your user metadata structure
 */
export async function isAdmin(): Promise<boolean> {
    const { valid, user } = await validateJWT()

    if (!valid || !user) {
        return false
    }

    // Check if user has admin role in metadata
    // Adjust this based on your Supabase user metadata structure
    const role = user.user_metadata?.role || user.app_metadata?.role

    return role === 'admin'
}

/**
 * Get session timeout in seconds
 */
export function getSessionTimeout(): number {
    return parseInt(process.env.SESSION_TIMEOUT || '3600', 10)
}
