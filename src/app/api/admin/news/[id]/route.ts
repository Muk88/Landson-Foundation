import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { withAuth } from '@/lib/auth-middleware'

// PUT update news - Admin only
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return withAuth(request, async (req, user) => {
        try {
            const body = await req.json()
            const { title, slug, excerpt, content, category, image_url, published_date, is_published } = body

            const supabase = createClient()

            const { data: news, error } = await supabase
                .from('news')
                .update({
                    title,
                    slug,
                    excerpt,
                    content,
                    category,
                    image_url,
                    published_date,
                    is_published
                })
                .eq('id', params.id)
                .select()
                .single()

            if (error) {
                if (error.code === '23505') {
                    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
                }
                return NextResponse.json({ error: error.message }, { status: 500 })
            }

            if (!news) {
                return NextResponse.json({ error: 'News article not found' }, { status: 404 })
            }

            return NextResponse.json({ news })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    })
}

// DELETE news - Admin only
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return withAuth(request, async (req, user) => {
        try {
            const supabase = createClient()

            const { error } = await supabase
                .from('news')
                .delete()
                .eq('id', params.id)

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 })
            }

            return NextResponse.json({ message: 'News article deleted successfully' })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    })
}
