'use server'

import { createClient } from '@supabase/supabase-js'

export async function submitContactForm(formData: FormData) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    // Try service role first for secure insert, fallback to anon key if not available
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    const firstName = formData.get('firstName')?.toString().trim()
    const lastName = formData.get('lastName')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const message = formData.get('message')?.toString().trim()

    if (!firstName || !lastName || !email || !message) {
        return { error: 'All fields are required.' }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { error: 'Please enter a valid email address.' }
    }

    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name: `${firstName} ${lastName}`.trim(),
                    email: email,
                    message: message,
                }
            ])

        if (error) {
            console.error('Supabase Error:', error)
            return { error: error.message || 'Failed to send message. Please try again later.' }
        }

        return { success: true }
    } catch (err: any) {
        console.error('Server Action Error:', err)
        return { error: 'An unexpected error occurred.' }
    }
}
