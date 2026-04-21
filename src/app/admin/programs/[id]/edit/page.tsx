'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import IconPicker from '@/components/ui/IconPicker'
import { supabase } from '@/lib/supabase'

// Force re-resolution
import { uploadImage } from '@/lib/storage'

export default function EditProgramPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        icon_name: '',
        image_url: '',
        images: [] as string[],
        order_index: 0,
        is_active: true,
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadingAdditional, setUploadingAdditional] = useState(false)

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const { data, error } = await supabase
                    .from('programs')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error
                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug || '',
                        description: data.description,
                        icon_name: data.icon_name || data.icon || '',
                        image_url: data.image_url || '',
                        images: data.images || [],
                        order_index: data.order_index,
                        is_active: data.is_active,
                    })
                }
            } catch (error) {
                console.error('Error fetching program:', error)
                alert('Error fetching program data')
                router.push('/admin/programs')
            } finally {
                setLoading(false)
            }
        }

        fetchProgram()
    }, [params.id, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.name === 'order_index' ? parseInt(e.target.value) || 0 : e.target.value
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

            const { url, error } = await uploadImage(file, 'programs')

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
                const { url, error } = await uploadImage(file, 'programs')

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
                .from('programs')
                .update(formData)
                .eq('id', params.id)

            if (error) throw error
            router.push('/admin/programs')
        } catch (error) {
            console.error('Error updating program:', error)
            alert('Failed to update program')
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
                <h1>Edit Program</h1>
                <p>Update program details</p>
            </div>

            <div className="content">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '600px' }}>
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
                            URL-friendly identifier (changing this breaks old links)
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            required
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Icon (Optional)</label>
                        <IconPicker
                            value={formData.icon_name}
                            onChange={(iconName) => setFormData(prev => ({ ...prev, icon_name: iconName }))}
                        />
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Select an icon representing this program
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Featured Image (Optional)</label>

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

                        {formData.image_url && (
                            <>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="Or enter image URL directly"
                                    style={{ marginTop: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                                <div style={{ marginTop: '0.5rem', width: '200px', height: '150px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.image_url}
                                        alt="Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </>
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
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Upload multiple images for program gallery
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Display Order *</label>
                        <input
                            type="number"
                            name="order_index"
                            value={formData.order_index}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Lower numbers appear first
                        </small>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            style={{ width: '1.2rem', height: '1.2rem' }}
                        />
                        <label htmlFor="is_active" style={{ fontWeight: 600, cursor: 'pointer' }}>
                            Active (visible on website)
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <Button type="submit" loading={saving || uploading || uploadingAdditional} size="lg">
                            {saving ? 'Saving...' : 'Update Program'}
                        </Button>
                        <Link href="/admin/programs">
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
