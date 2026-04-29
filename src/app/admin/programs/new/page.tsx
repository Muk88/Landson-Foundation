'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import IconPicker from '@/components/ui/IconPicker'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'

import { getAdminPath } from '@/lib/admin-path'

// Force re-compile

// ... (keep existing imports)

export default function NewProgramPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        icon_name: '',
        image_url: '',
        images: [] as string[],
        order_index: 0,
        is_active: true
    })
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadingAdditional, setUploadingAdditional] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.name === 'order_index' ? parseInt(e.target.value) || 0 : e.target.value

        // Auto-generate slug from title if slug is empty or matches previous auto-slug
        if (e.target.name === 'title') {
            const currentSlug = formData.slug
            const autoSlug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

            // If slug implies it was auto-generated (or empty), update it
            // simplistic approach: just update it. User can edit slug specifically if they want.
            // But better to just update title in state, and have a separate effect?
            // Let's just do it in one go for simplicity.
            setFormData(prev => ({
                ...prev,
                title: value as string,
                slug: !prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                    ? autoSlug
                    : prev.slug
            }))
            return
        }

        setFormData(prev => ({
            ...prev,
            [e.target.name]: value,
        }))
    }

    // ... existing handlers ...

    // (Inside JSX after Title input)
    /*
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
            <small style={{ color: 'var(--color-gray-600)' }}>URL-friendly version of the title</small>
        </div>
    */

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
                .insert([formData])

            if (error) throw error
            router.push(`${adminPath}/programs`)
        } catch (error) {
            console.error('Error creating program:', error)
            alert('Failed to create program')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Add Program</h1>
                    <p className="text-gray-500 mt-1">Create a new foundation program</p>
                </div>
                <Link href={`${adminPath}/programs`} className="text-sm font-bold text-gray-500 hover:text-brand-red flex items-center gap-2 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-full">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Programs
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

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Description <span className="text-brand-red">*</span></label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all resize-y"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Icon (Optional)</label>
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                            <IconPicker
                                value={formData.icon_name}
                                onChange={(iconName) => setFormData(prev => ({ ...prev, icon_name: iconName }))}
                            />
                        </div>
                        <small className="text-gray-500">Select an icon representing this program</small>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <label className="font-bold text-gray-900 text-sm block mb-4">Featured Image (Optional)</label>

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
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all text-sm mb-4"
                        />
                        {formData.image_url && (
                            <div className="w-48 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
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
                        <p className="text-xs text-gray-500 mb-4">Upload multiple images for program gallery</p>

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
                            {uploadingAdditional && <div className="spinner w-5 h-5"></div>}
                        </div>

                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                {formData.images.map((url, index) => (
                                    <div key={index} className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={url} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeAdditionalImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Display Order <span className="text-brand-red">*</span></label>
                        <input
                            type="number"
                            name="order_index"
                            value={formData.order_index}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                        />
                        <small className="text-gray-500">Lower numbers appear first</small>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors w-fit">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="peer w-6 h-6 rounded text-brand-green focus:ring-brand-green/20 accent-brand-green cursor-pointer"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Active</p>
                                <p className="text-xs text-gray-500">Visible on the website</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
                        <Button type="submit" loading={saving || uploading || uploadingAdditional} size="lg" className="bg-brand-green hover:bg-green-700 text-white px-8 rounded-full shadow-lg shadow-brand-green/20">
                            {saving ? 'Saving...' : 'Create Program'}
                        </Button>
                        <Link href={`${adminPath}/programs`}>
                            <Button variant="outline" className="rounded-full px-6 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
