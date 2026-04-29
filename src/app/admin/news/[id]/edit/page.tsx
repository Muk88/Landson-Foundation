'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'
import { getAdminPath } from '@/lib/admin-path'

export default function EditNewsPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        image_url: '',
        youtube_url: '',
        published_date: '',
        is_published: false,
        images: [] as string[]
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data, error } = await supabase
                    .from('news')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error
                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug,
                        excerpt: data.excerpt || '',
                        content: data.content,
                        category: data.category || '',
                        image_url: data.image_url,
                        youtube_url: data.youtube_url || '',
                        published_date: data.published_date.split('T')[0],
                        is_published: data.is_published,
                        images: data.images || []
                    })
                }
            } catch (error) {
                console.error('Error fetching news:', error)
                alert('Error fetching news article')
                router.push(`${adminPath}/news`)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [params.id, router])

    const [uploadingAdditional, setUploadingAdditional] = useState(false)

    // ... useEffect ...

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === 'title') {
            const currentSlug = formData.slug
            const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

            // Only auto-update if slug was auto-generated (or match) - strict simple logic for now
            setFormData(prev => ({
                ...prev,
                title: value,
                slug: !prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ? autoSlug : prev.slug
            }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            setUploading(true)
            const file = e.target.files[0]
            const { url, error } = await uploadImage(file, 'news')
            if (error) throw new Error(error)
            if (!url) throw new Error('Upload successful but no URL returned')
            setFormData(prev => ({ ...prev, image_url: url }))
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const [uploadProgress, setUploadProgress] = useState('')

    const handleAdditionalImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            setUploadingAdditional(true)
            const files = Array.from(e.target.files)
            setUploadProgress(`Uploading 0 of ${files.length}...`)

            let completed = 0
            const uploadPromises = files.map(async (file) => {
                const { url, error } = await uploadImage(file, 'news')
                completed++
                setUploadProgress(`Uploading ${completed} of ${files.length}...`)
                return { url, error }
            })

            const results = await Promise.all(uploadPromises)

            const uploadedUrls = results
                .filter(r => r.url && !r.error)
                .map(r => r.url as string)

            const failures = results.filter(r => r.error)

            if (failures.length > 0) {
                alert(`Successfully uploaded ${uploadedUrls.length} images. Failed: ${failures.length}`)
            }

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }))
        } catch (error: any) {
            alert('Error handling uploads: ' + error.message)
        } finally {
            setUploadingAdditional(false)
            setUploadProgress('')
            e.target.value = ''
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { error } = await supabase
                .from('news')
                .update(formData)
                .eq('id', params.id)

            if (error) throw error
            router.push(`${adminPath}/news`)
        } catch (error) {
            console.error('Error updating news:', error)
            alert('Failed to update news article')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Edit News Article</h1>
                    <p className="text-gray-500 mt-1">Update news article details</p>
                </div>
                <Link href={`${adminPath}/news`} className="text-sm font-bold text-gray-500 hover:text-brand-red flex items-center gap-2 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-full">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to News
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Title <span className="text-brand-red">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">Category <span className="text-brand-red">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all bg-white"
                            >
                                <option value="">Select Category</option>
                                <option value="General">General</option>
                                <option value="Athletics">Athletics</option>
                                <option value="Education">Education</option>
                                <option value="Community">Community</option>
                                <option value="Diplomacy">Diplomacy</option>
                                <option value="Events">Events</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">Slug <span className="text-brand-red">*</span></label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500">URL-friendly identifier</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Excerpt (Optional)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief summary for previews..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all resize-y"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Content <span className="text-brand-red">*</span></label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={15}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all resize-y font-mono text-sm"
                        />
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <label className="font-bold text-gray-900 text-sm block mb-4">Featured Image <span className="text-brand-red">*</span></label>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <label className="relative cursor-pointer bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="sr-only"
                                />
                            </label>
                            {uploading && <div className="spinner w-5 h-5"></div>}
                        </div>

                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="Or enter image URL directly"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all text-sm mb-4"
                        />
                        {formData.image_url && (
                            <div className="w-full max-w-md h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={formData.image_url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <label className="font-bold text-gray-900 text-sm block mb-1">Additional Images</label>
                        <p className="text-xs text-gray-500 mb-4">Upload multiple images for gallery</p>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <label className="relative cursor-pointer bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload Gallery Images
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleAdditionalImages}
                                    disabled={uploadingAdditional}
                                    className="sr-only"
                                />
                            </label>
                            {uploadingAdditional && (
                                <div className="flex items-center gap-2">
                                    <div className="spinner w-5 h-5"></div>
                                    <span className="text-sm text-gray-600 font-medium">{uploadProgress}</span>
                                </div>
                            )}
                        </div>

                        {formData.images && formData.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                {formData.images.map((url, index) => (
                                    <div key={index} className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={url} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">Publish Date <span className="text-brand-red">*</span></label>
                            <input
                                type="date"
                                name="published_date"
                                value={formData.published_date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">YouTube Video Link</label>
                            <input
                                type="url"
                                name="youtube_url"
                                value={formData.youtube_url}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500">Link to a related YouTube video</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors w-fit">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={formData.is_published}
                                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                    className="peer w-6 h-6 rounded text-brand-green focus:ring-brand-green/20 accent-brand-green cursor-pointer"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Publish immediately</p>
                                <p className="text-xs text-gray-500">Make visible on the website</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
                        <Button type="submit" loading={saving || uploading || uploadingAdditional} size="lg" className="bg-brand-green hover:bg-green-700 text-white px-8 rounded-full shadow-lg shadow-brand-green/20">
                            {saving ? 'Saving...' : 'Update Article'}
                        </Button>
                        <Link href={`${adminPath}/news`}>
                            <Button variant="outline" className="rounded-full px-6 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
