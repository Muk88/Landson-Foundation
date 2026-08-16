'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/storage'
import { getAdminPath } from '@/lib/admin-path'

export default function NewAlumniPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [formData, setFormData] = useState({
        name: '',
        current_role: '',
        quote: '',
        linkedin_url: '',
        image_url: '',
        is_active: true,
    })
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            setUploading(true)
            const file = e.target.files[0]

            const { url, error } = await uploadImage(file, 'alumni')

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { error } = await supabase
                .from('alumni')
                .insert([formData])

            if (error) throw error
            router.push(`${adminPath}/stories`)
        } catch (error) {
            console.error('Error creating alumni:', error)
            alert('Failed to create alumni')
        } finally {
            setSaving(false)
        }
    }
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
            <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Add Alumni</h1>
                    <p className="text-gray-500 mt-1">Create a new alumni profile</p>
                </div>
                <Link href={`${adminPath}/stories`} className="text-sm font-bold text-gray-500 hover:text-brand-red flex items-center gap-2 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-full">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Stories & Alumni
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">Name <span className="text-brand-red">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., John Doe"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-gray-900 text-sm">Current Role <span className="text-brand-red">*</span></label>
                            <input
                                type="text"
                                name="current_role"
                                value={formData.current_role}
                                onChange={handleChange}
                                placeholder="e.g., Software Engineer at Google"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">Quote <span className="text-brand-red">*</span></label>
                        <textarea
                            name="quote"
                            value={formData.quote}
                            onChange={handleChange}
                            rows={4}
                            placeholder="A brief quote from the alumni..."
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all resize-y"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold text-gray-900 text-sm">LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                            placeholder="https://www.linkedin.com/in/..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all"
                        />
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <label className="font-bold text-gray-900 text-sm block mb-4">Profile Image <span className="text-brand-red">*</span></label>

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
                            <div className="w-48 h-48 rounded-full overflow-hidden border border-gray-200 shadow-sm relative group mx-auto">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={formData.image_url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
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
                                <p className="font-bold text-gray-900 text-sm">Active Profile</p>
                                <p className="text-xs text-gray-500">Display this alumni on the website</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
                        <Button type="submit" loading={saving || uploading} size="lg" className="bg-brand-green hover:bg-green-700 text-white px-8 rounded-full shadow-lg shadow-brand-green/20">
                            {saving ? 'Saving...' : 'Create Alumni'}
                        </Button>
                        <Link href={`${adminPath}/stories`}>
                            <Button variant="outline" className="rounded-full px-6 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
