'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type SuccessStory } from '@/lib/supabase'
import styles from './page.module.css'

export default function StoriesManagementPage() {
    const router = useRouter()
    const [stories, setStories] = useState<SuccessStory[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'featured' | 'regular'>('all')

    useEffect(() => {
        fetchStories()
    }, [filter])

    async function fetchStories() {
        try {
            let query = supabase
                .from('success_stories')
                .select('*')
                .order('created_at', { ascending: false })

            if (filter === 'featured') {
                query = query.eq('is_featured', true)
            } else if (filter === 'regular') {
                query = query.eq('is_featured', false)
            }

            const { data, error } = await query

            if (error) throw error
            setStories(data || [])
        } catch (error) {
            console.error('Error fetching stories:', error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleFeatured(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('success_stories')
                .update({ is_featured: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchStories()
        } catch (error) {
            console.error('Error toggling featured:', error)
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
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Success Stories</h1>
                    <p className={styles.subtitle}>Manage success stories for athletes and programs</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'featured' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('featured')}
                        >
                            Featured
                        </Button>
                        <Button
                            variant={filter === 'regular' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('regular')}
                        >
                            Regular
                        </Button>
                    </div>
                    <Link href="/admin/stories/new">
                        <Button>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Story
                        </Button>
                    </Link>
                </div>
            </div>

            <div className={styles.content}>
                {loading ? (
                    <div>Loading...</div>
                ) : stories.length > 0 ? (
                    <div className={styles.storiesList}>
                        {stories.map((story) => (
                            <div key={story.id} className={styles.storyCard}>
                                {story.image_url && (
                                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={story.image_url}
                                            alt={story.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className={styles.storyHeader}>
                                        <h3 className={styles.athleteName}>{story.name}</h3>
                                        <span className={`${styles.statusBadge} ${story.is_featured ? styles.published : styles.draft}`}>
                                            {story.is_featured ? 'Featured' : 'Regular'}
                                        </span>
                                    </div>
                                    <p className={styles.achievement}>
                                        <strong>{story.title}</strong>
                                        {story.year && ` (${story.year})`}
                                    </p>
                                    {story.achievement && (
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-600)', marginTop: '0.5rem' }}>
                                            {story.achievement}
                                        </p>
                                    )}
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => toggleFeatured(story.id, story.is_featured)}
                                        title={story.is_featured ? 'Unfeature' : 'Feature'}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => router.push(`/admin/stories/${story.id}/edit`)}
                                        title="Edit"
                                        style={{ color: '#2563eb', borderColor: '#2563eb' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => deleteStory(story.id)}
                                        title="Delete"
                                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>{filter === 'all' ? 'No stories yet. Create your first success story!' : `No ${filter} stories found.`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
