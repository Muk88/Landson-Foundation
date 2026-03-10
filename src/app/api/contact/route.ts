import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Insert message into database
        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name,
                    email,
                    message,
                    is_read: false,
                },
            ])

        if (error) {
            console.error('Supabase error:', error)
            throw error
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing contact form:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .single()

        if (error) {
            console.error('Error fetching contact info:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in contact info API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, phone, address, facebook_url, twitter_url, instagram_url } = body

        // Basic validation
        if (!email || !phone || !address) {
            return NextResponse.json(
                { error: 'Email, phone, and address are required' },
                { status: 400 }
            )
        }

        // Update the single row (we assume only one row exists or we update all/first)
        // Since we don't know the ID, and there's only one row, we can fetch it first or just update where id is not null if we knew the ID.
        // Better approach: Update the specific row. But wait, we don't pass the ID from the frontend usually for a singleton.
        // Let's fetch the single row ID first, or just update "all" (which is just one).
        // Safest: Fetch first.

        const { data: existing, error: fetchError } = await supabaseAdmin
            .from('contact_info')
            .select('id')
            .single()

        let result;

        if (fetchError || !existing) {
            // If no row exists (shouldn't happen if seeded, but safe fallback), insert one
            result = await supabaseAdmin
                .from('contact_info')
                .insert([{
                    email,
                    phone,
                    address,
                    facebook_url,
                    twitter_url,
                    instagram_url
                }])
        } else {
            // Update existing
            result = await supabaseAdmin
                .from('contact_info')
                .update({
                    email,
                    phone,
                    address,
                    facebook_url,
                    twitter_url,
                    instagram_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existing.id)
        }

        if (result.error) {
            console.error('Error updating contact info:', result.error)
            return NextResponse.json({ error: result.error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Contact info updated' })

    } catch (error) {
        console.error('Error updating contact info:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
