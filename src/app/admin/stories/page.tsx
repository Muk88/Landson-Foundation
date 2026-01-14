'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type SuccessStory } from '@/lib/supabase'

export default function StoriesManagementPage() {
    const router = useRouter()
    const [stories, setStories] = useState<SuccessStory[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStories()
    }, [])

    async function fetchStories() {
        try {
            const { data, error } = await supabase
                .from('success_stories')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setStories(data || [])
        } catch (error) {
            console.error('Error fetching stories:', error)
        } finally {
            setLoading(false)
        }
    }

    async function togglePublish(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('success_stories')
                .update({ published: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchStories()
        } catch (error) {
            console.error('Error toggling publish:', error)
        }
    }

    async function deleteStory(id: string) {
        if (!confirm('Are you sure you want to delete this story?')) return

        try {
            const { error } = await supabase
                .from('success_stories')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchStories()
        } catch (error) {
            console.error('Error deleting story:', error)
        }
    }

    return (
        <>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Success Stories</h1>
                    <p>Manage athlete success stories</p>
                </div>
                <Link href="/admin/stories/new">
                    <Button>+ Add New Story</Button>
                </Link>
            </div>

            <div className="content">
                {loading ? (
                    <div>Loading...</div>
                ) : stories.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {stories.map((story) => (
                            <div
                                key={story.id}
                                style={{
                                    padding: 'var(--spacing-lg)',
                                    border: '2px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <h3 style={{ color: 'var(--color-red)', marginBottom: '0.5rem' }}>
                                        {story.athlete_name}
                                    </h3>
                                    <p style={{ color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
                                        {story.achievement}
                                    </p>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.875rem',
                                            background: story.published ? 'var(--color-green)' : 'var(--color-gray-400)',
                                            color: 'white',
                                        }}
                                    >
                                        {story.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => togglePublish(story.id, story.published)}
                                    >
                                        {story.published ? 'Unpublish' : 'Publish'}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => router.push(`/admin/stories/${story.id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => deleteStory(story.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-gray-500)' }}>
                        <p>No stories yet. Create your first success story!</p>
                    </div>
                )}
            </div>
        </>
    )
}
