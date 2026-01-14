import { supabaseAdmin } from './supabase'

export interface AdminSession {
    userId: string
    email: string
    role: string
}

export async function verifyAdmin(email: string, password: string): Promise<AdminSession | null> {
    try {
        // Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        })

        if (authError || !authData.user) {
            return null
        }

        // Check if user is in admin_users table
        const { data: adminData, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('id', authData.user.id)
            .single()

        if (adminError || !adminData) {
            return null
        }

        return {
            userId: adminData.id,
            email: adminData.email,
            role: adminData.role,
        }
    } catch (error) {
        console.error('Admin verification error:', error)
        return null
    }
}

export function isAuthenticated(session: AdminSession | null): boolean {
    return session !== null && session.role === 'admin'
}
