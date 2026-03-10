import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                auth: { persistSession: false },
                global: {
                    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
                },
            }
        )

        const { data: programs, error } = await supabase
            .from('programs')
            .select('*')
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) {
            console.error('Error fetching programs:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ programs })
    } catch (error: any) {
        console.error('Error in programs API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
