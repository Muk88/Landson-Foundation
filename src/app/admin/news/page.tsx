'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type News } from '@/lib/supabase'
import styles from './page.module.css'

export default function NewsManagementPage() {
    const router = useRouter()
    const [news, setNews] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'published' | 'unpublished'>('all')

    useEffect(() => {
        fetchNews()
    }, [filter])

    async function fetchNews() {
        try {
            let query = supabase
                .from('news')
                .select('*')
                .order('published_date', { ascending: false })

            if (filter === 'published') {
                query = query.eq('is_published', true)
            } else if (filter === 'unpublished') {
                query = query.eq('is_published', false)
            }

            const { data, error } = await query

            if (error) throw error
            setNews(data || [])
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    async function togglePublish(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('news')
                .update({ is_published: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchNews()
        } catch (error) {
            console.error('Error toggling publish:', error)
        }
    }

    async function deleteNews(id: string) {
        if (!confirm('Are you sure you want to delete this news article?')) return

        try {
            const { error } = await supabase
                .from('news')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchNews()
        } catch (error) {
            console.error('Error deleting news:', error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>News Articles</h1>
                    <p className={styles.subtitle}>Manage news and updates</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'published' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('published')}
                        >
                            Published
                        </Button>
                        <Button
                            variant={filter === 'unpublished' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('unpublished')}
                        >
                            Unpublished
                        </Button>
                    </div>
                    <Link href="/admin/news/new">
                        <Button>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add News
                        </Button>
                    </Link>
                </div>
            </div>

            <div className={styles.content}>
                {loading ? (
                    <div>Loading...</div>
                ) : news.length > 0 ? (
                    <div className={styles.newsList}>
                        {news.map((article) => (
                            <div key={article.id} className={styles.newsCard}>
                                {article.image_url && (
                                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className={styles.newsHeader}>
                                        <h3 className={styles.newsTitle}>{article.title}</h3>
                                        <span className={`${styles.statusBadge} ${article.is_published ? styles.published : styles.draft}`}>
                                            {article.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    {article.excerpt && (
                                        <p className={styles.excerpt}>{article.excerpt}</p>
                                    )}
                                    <div className={styles.meta}>
                                        <span className={styles.date}>
                                            {new Date(article.published_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => togglePublish(article.id, article.is_published)}
                                        title={article.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {article.is_published ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            )}
                                        </svg>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => router.push(`/admin/news/${article.id}/edit`)}
                                        title="Edit"
                                        style={{ color: '#2563eb', borderColor: '#2563eb' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => deleteNews(article.id)}
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
                        <p>{filter === 'all' ? 'No news articles yet.' : `No ${filter} articles found.`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
