'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'

export default function EditStoryPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        story: '',
        achievement: '',
        image_url: '',
        images: [] as string[],
        youtube_url: '',
        year: new Date().getFullYear(),
        is_featured: false,
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadingAdditional, setUploadingAdditional] = useState(false)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const { data, error } = await supabase
                    .from('success_stories')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error
                if (data) {
                    setFormData({
                        name: data.name,
                        title: data.title,
                        story: data.story,
                        achievement: data.achievement || '',
                        image_url: data.image_url,
                        images: data.images || [],
                        youtube_url: data.youtube_url || '',
                        year: data.year || new Date().getFullYear(),
                        is_featured: data.is_featured,
                    })
                }
            } catch (error) {
                console.error('Error fetching story:', error)
                alert('Error fetching story data')
                router.push('/admin/stories')
            } finally {
                setLoading(false)
            }
        }

        fetchStory()
    }, [params.id, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.name === 'year' ? parseInt(e.target.value) || new Date().getFullYear() : e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value,
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            setUploading(true)
            const file = e.target.files[0]

            const { url, error } = await uploadImage(file, 'stories')

            if (error) throw new Error(error)
            if (!url) throw new Error('Upload successful but no URL returned')

            setFormData(prev => ({ ...prev, image_url: url }))
        } catch (error: any) {
            console.error('Error uploading image:', error)
            alert('Error uploading image: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const handleAdditionalImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            setUploadingAdditional(true)
            const uploadedUrls: string[] = []

            for (const file of Array.from(e.target.files)) {
                const { url, error } = await uploadImage(file, 'stories')

                if (error) throw new Error(error)
                if (url) uploadedUrls.push(url)
            }

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }))
        } catch (error: any) {
            console.error('Error uploading images:', error)
            alert('Error uploading images: ' + error.message)
        } finally {
            setUploadingAdditional(false)
        }
    }

    const removeAdditionalImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { error } = await supabase
                .from('success_stories')
                .update(formData)
                .eq('id', params.id)

            if (error) throw error
            router.push('/admin/stories')
        } catch (error) {
            console.error('Error updating story:', error)
            alert('Failed to update story')
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
                <h1>Edit Success Story</h1>
                <p>Update success story details</p>
            </div>

            <div className="content">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

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
                        <label style={{ fontWeight: 600 }}>Story *</label>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleChange}
                            rows={10}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Achievement (Optional)</label>
                        <input
                            type="text"
                            name="achievement"
                            value={formData.achievement}
                            onChange={handleChange}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
                            required
                            style={{ marginTop: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {formData.image_url && (
                            <div style={{ marginTop: '0.5rem', width: '200px', height: '150px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd' }}>
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
                            {uploadingAdditional && <span className="spinner" style={{ width: '20px', height: '20px' }}></span>}
                        </div>

                        {formData.images.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {formData.images.map((url, index) => (
                                    <div key={index} style={{ position: 'relative', width: '100%', height: '100px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ddd' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={url} alt={`Additional ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => removeAdditionalImage(index)}
                                            style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Year (Optional)</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            min="1900"
                            max="2100"
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="is_featured"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            style={{ width: '1.2rem', height: '1.2rem' }}
                        />
                        <label htmlFor="is_featured" style={{ fontWeight: 600, cursor: 'pointer' }}>
                            Feature this story
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <Button type="submit" loading={saving || uploading || uploadingAdditional} size="lg">
                            {saving ? 'Saving...' : 'Update Story'}
                        </Button>
                        <Link href="/admin/stories">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
