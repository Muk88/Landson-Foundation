import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const featured = searchParams.get('featured') === 'true'

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

        let query = supabase
            .from('success_stories')
            .select('*')
            .order('year', { ascending: false })

        if (featured) {
            query = query.eq('is_featured', true)
        }

        const { data: stories, error } = await query

        if (error) {
            console.error('Error fetching stories:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ stories })
    } catch (error: any) {
        console.error('Error in stories API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
