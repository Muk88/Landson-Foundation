import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = parseInt(searchParams.get('offset') || '0')

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

        const { data: news, error, count } = await supabase
            .from('news')
            .select('*', { count: 'exact' })
            .eq('is_published', true)
            .order('published_date', { ascending: false })
            .range(offset, offset + limit - 1)

        if (error) {
            console.error('Error fetching news:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            news,
            total: count,
            limit,
            offset
        })
    } catch (error: any) {
        console.error('Error in news API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
