'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type SuccessStory, type Alumni } from '@/lib/supabase'
import { getAdminPath } from '@/lib/admin-path'
import styles from './page.module.css'

export default function StoriesManagementPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [stories, setStories] = useState<SuccessStory[]>([])
    const [alumniList, setAlumniList] = useState<Alumni[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'featured' | 'regular'>('all')
    const [viewMode, setViewMode] = useState<'stories' | 'alumni'>('stories')

    useEffect(() => {
        if (viewMode === 'stories') {
            fetchStories()
        } else {
            fetchAlumni()
        }
    }, [filter, viewMode])

    async function fetchAlumni() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('alumni')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setAlumniList(data || [])
        } catch (error) {
            console.error('Error fetching alumni:', error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleAlumniActive(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('alumni')
                .update({ is_active: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchAlumni()
        } catch (error) {
            console.error('Error toggling alumni active:', error)
        }
    }

    async function deleteAlumni(id: string) {
        if (!confirm('Are you sure you want to delete this alumni?')) return

        try {
            const { error } = await supabase
                .from('alumni')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchAlumni()
        } catch (error) {
            console.error('Error deleting alumni:', error)
        }
    }

    async function fetchStories() {
        try {
            setLoading(true)
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
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <button 
                            onClick={() => setViewMode('stories')}
                            className={`text-2xl md:text-3xl font-heading font-black tracking-tight transition-colors ${viewMode === 'stories' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Success Stories
                        </button>
                        <span className="text-gray-300 text-2xl font-light">|</span>
                        <button 
                            onClick={() => setViewMode('alumni')}
                            className={`text-2xl md:text-3xl font-heading font-black tracking-tight transition-colors ${viewMode === 'alumni' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Alumni
                        </button>
                    </div>
                    <p className="text-gray-500 mt-1">
                        {viewMode === 'stories' ? 'Manage success stories for athletes and programs' : 'Manage alumni profiles and updates'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {viewMode === 'stories' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                variant={filter === 'all' ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('all')}
                            >
                                All
                            </Button>
                            <Button
                                variant={filter === 'featured' ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('featured')}
                            >
                                Featured
                            </Button>
                            <Button
                                variant={filter === 'regular' ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('regular')}
                            >
                                Regular
                            </Button>
                        </div>
                    )}
                    {viewMode === 'stories' ? (
                        <Link href={`${adminPath}/stories/new`}>
                            <Button className="bg-brand-green hover:bg-green-700 text-white shadow-lg shadow-brand-green/20 rounded-full font-bold px-6">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Story
                            </Button>
                        </Link>
                    ) : (
                        <Link href={`${adminPath}/stories/alumni/new`}>
                            <Button className="bg-brand-green hover:bg-green-700 text-white shadow-lg shadow-brand-green/20 rounded-full font-bold px-6">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Alumni
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="w-full">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="spinner"></div>
                    </div>
                ) : viewMode === 'stories' ? (
                    stories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stories.map((story) => (
                                <div key={story.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col p-5 group">
                                    {story.image_url && (
                                        <div className="w-full h-48 overflow-hidden rounded-xl mb-4 relative">
                                            <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={story.image_url}
                                                alt={story.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight">{story.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0 ${story.is_featured ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-500'}`}>
                                                {story.is_featured ? 'Featured' : 'Regular'}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {story.title}
                                            {story.year && <span className="text-gray-400 font-normal"> • {story.year}</span>}
                                        </p>
                                        {story.achievement && (
                                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                {story.achievement}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => toggleFeatured(story.id, story.is_featured)}
                                            title={story.is_featured ? 'Unfeature' : 'Feature'}
                                            className={`p-2 rounded-full transition-colors ${story.is_featured ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                                        >
                                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => router.push(`${adminPath}/stories/${story.id}/edit`)}
                                            title="Edit"
                                            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ml-auto"
                                        >
                                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteStory(story.id)}
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No stories found</h3>
                            <p className="text-gray-500">{filter === 'all' ? 'Create your first success story to inspire others!' : `No ${filter} stories found.`}</p>
                        </div>
                    )
                ) : (
                    alumniList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {alumniList.map((alumnus) => (
                                <div key={alumnus.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col p-5 group">
                                    {alumnus.image_url && (
                                        <div className="w-full h-48 overflow-hidden rounded-xl mb-4 relative">
                                            <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={alumnus.image_url}
                                                alt={alumnus.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight">{alumnus.name}</h3>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0 ${alumnus.is_active ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-500'}`}>
                                                {alumnus.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700 mb-2">
                                            {alumnus.current_role}
                                        </p>
                                        {alumnus.quote && (
                                            <p className="text-sm text-gray-500 italic line-clamp-3">
                                                "{alumnus.quote}"
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => toggleAlumniActive(alumnus.id, alumnus.is_active)}
                                            title={alumnus.is_active ? 'Deactivate' : 'Activate'}
                                            className={`p-2 rounded-full transition-colors ${alumnus.is_active ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20'}`}
                                        >
                                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {alumnus.is_active ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                )}
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => router.push(`${adminPath}/stories/alumni/${alumnus.id}/edit`)}
                                            title="Edit"
                                            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ml-auto"
                                        >
                                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteAlumni(alumnus.id)}
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No alumni found</h3>
                            <p className="text-gray-500">Add an alumni profile to showcase their journey.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
