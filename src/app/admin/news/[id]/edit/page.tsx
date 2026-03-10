'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'

export default function EditNewsPage({ params }: { params: { id: string } }) {
    const router = useRouter()
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
                router.push('/admin/news')
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
            router.push('/admin/news')
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
        <>
            <div className="header">
                <h1>Edit News Article</h1>
                <p>Update news article details</p>
            </div>

            <div className="content">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            URL-friendly identifier
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Excerpt (Optional)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief summary for previews..."
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Content *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={15}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Featured Image *</label>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                style={{ padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px', background: '#f9f9f9' }}
                            />
                            {uploading && <span className="spinner" style={{ width: '20px', height: '20px' }}></span>}
                        </div>

                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="Or enter image URL directly"
                            required
                            style={{ marginTop: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {formData.image_url && (
                            <div style={{ marginTop: '0.5rem', width: '300px', height: '200px', position: 'relative', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={formData.image_url}
                                    alt="Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Additional Images (Optional)</label>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleAdditionalImages}
                                disabled={uploadingAdditional}
                                style={{ padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px', background: '#f9f9f9' }}
                            />
                            {uploadingAdditional && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="spinner" style={{ width: '20px', height: '20px' }}></span>
                                    <span style={{ fontSize: '0.9rem', color: '#666' }}>{uploadProgress}</span>
                                </div>
                            )}
                        </div>

                        {formData.images && formData.images.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {formData.images.map((url, index) => (
                                    <div key={index} style={{ position: 'relative', width: '100%', height: '100px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={url} alt={`Additional ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                                            style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Upload multiple images for gallery
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Publish Date *</label>
                        <input
                            type="date"
                            name="published_date"
                            value={formData.published_date}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>YouTube Video Link (Optional)</label>
                        <input
                            type="url"
                            name="youtube_url"
                            value={formData.youtube_url}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Link to a related YouTube video
                        </small>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="is_published"
                            checked={formData.is_published}
                            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                            style={{ width: '1.2rem', height: '1.2rem' }}
                        />
                        <label htmlFor="is_published" style={{ fontWeight: 600, cursor: 'pointer' }}>
                            Publish immediately
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <Button type="submit" loading={saving || uploading} size="large">
                            {saving ? 'Saving...' : 'Update Article'}
                        </Button>
                        <Link href="/admin/news">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
