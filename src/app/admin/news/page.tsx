'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type News } from '@/lib/supabase'
import { getAdminPath } from '@/lib/admin-path'
import styles from './page.module.css'

export default function NewsManagementPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
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
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">News Articles</h1>
                    <p className="text-gray-500 mt-1">Manage news and updates</p>
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
                    <Link href={`${adminPath}/news/new`}>
                        <Button className="bg-brand-green hover:bg-green-700 text-white shadow-lg shadow-brand-green/20 rounded-full font-bold px-6">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add News
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="spinner"></div>
                    </div>
                ) : news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article) => (
                            <div key={article.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col p-5 group">
                                {article.image_url && (
                                    <div className="w-full h-48 overflow-hidden rounded-xl mb-4 relative">
                                        <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight">{article.title}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0 ${article.is_published ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-500'}`}>
                                            {article.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    {article.excerpt && (
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{article.excerpt}</p>
                                    )}
                                    <div className="mt-4 flex items-center text-xs font-bold text-gray-400">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(article.published_date).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => togglePublish(article.id, article.is_published)}
                                        title={article.is_published ? 'Unpublish' : 'Publish'}
                                        className={`p-2 rounded-full transition-colors ${article.is_published ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20'}`}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {article.is_published ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            )}
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => router.push(`${adminPath}/news/${article.id}/edit`)}
                                        title="Edit"
                                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ml-auto"
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteNews(article.id)}
                                        title="Delete"
                                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No news found</h3>
                        <p className="text-gray-500">{filter === 'all' ? 'Create your first news article.' : `No ${filter} articles found.`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
