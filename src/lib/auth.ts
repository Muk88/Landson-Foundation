import { supabaseAdmin } from './supabase'

export interface AdminSession {
    userId: string
    email: string
    role: string
}

export async function verifyAdmin(email: string, password: string): Promise<AdminSession | null> {
    try {
        // Authenticate with Supabase Auth only
        const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        })

        if (authError || !authData.user) {
            console.error('Authentication failed:', authError?.message)
            return null
        }

        // Return session directly from authenticated user
        return {
            userId: authData.user.id,
            email: authData.user.email || email,
            role: 'admin', // All authenticated users get admin role
        }
    } catch (error) {
        console.error('Admin verification error:', error)
        return null
    }
}

export function isAuthenticated(session: AdminSession | null): boolean {
    return session !== null
}
