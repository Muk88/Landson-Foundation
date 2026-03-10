import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const supabase = createClient()

        const { data: news, error } = await supabase
            .from('news')
            .select('*')
            .eq('slug', params.slug)
            .eq('is_published', true)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'News article not found' }, { status: 404 })
            }
            console.error('Error fetching news:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(news)
    } catch (error: any) {
        console.error('Error in news API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
