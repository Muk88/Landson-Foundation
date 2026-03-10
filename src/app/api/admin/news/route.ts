import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

// GET all news (including unpublished) - Admin only
export async function GET(request: NextRequest) {
    return withAuth(request, async (req, user) => {
        try {
            const supabase = createClient()

            const { data: news, error } = await supabase
                .from('news')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 })
            }

            return NextResponse.json({ news })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    })
}

// POST create new news - Admin only
export async function POST(request: NextRequest) {
    return withAuth(request, async (req, user) => {
        try {
            const body = await req.json()
            const { title, slug, excerpt, content, category, image_url, published_date, is_published } = body

            // Validation
            if (!title || !slug || !excerpt || !content || !category || !image_url) {
                return NextResponse.json(
                    { error: 'Missing required fields' },
                    { status: 400 }
                )
            }

            const supabase = createClient()

            const { data: news, error } = await supabase
                .from('news')
                .insert([{
                    title,
                    slug,
                    excerpt,
                    content,
                    category,
                    image_url,
                    published_date: published_date || new Date().toISOString().split('T')[0],
                    is_published: is_published !== undefined ? is_published : true
                }])
                .select()
                .single()

            if (error) {
                if (error.code === '23505') { // Unique violation
                    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
                }
                return NextResponse.json({ error: error.message }, { status: 500 })
            }

            return NextResponse.json({ news }, { status: 201 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    })
}
