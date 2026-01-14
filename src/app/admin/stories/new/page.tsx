'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export default function NewStoryPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        athlete_name: '',
        achievement: '',
        story_content: '',
        image_url: '',
        youtube_url: '',
        published: false,
    })
    const [saving, setSaving] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { error } = await supabase
                .from('success_stories')
                .insert([formData])

            if (error) throw error
            router.push('/admin/stories')
        } catch (error) {
            console.error('Error creating story:', error)
            alert('Failed to create story')
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <div className="header">
                <h1>Add New Success Story</h1>
                <p>Create a new athlete success story</p>
            </div>

            <div className="content">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Athlete Name *</label>
                        <input
                            type="text"
                            name="athlete_name"
                            value={formData.athlete_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Achievement *</label>
                        <input
                            type="text"
                            name="achievement"
                            value={formData.achievement}
                            onChange={handleChange}
                            placeholder="e.g., National Champion 2024"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Story Content *</label>
                        <textarea
                            name="story_content"
                            value={formData.story_content}
                            onChange={handleChange}
                            rows={10}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Image URL *</label>
                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        <small style={{ color: 'var(--color-gray-600)' }}>
                            Upload image to Supabase Storage or use external URL
                        </small>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>YouTube URL (Optional)</label>
                        <input
                            type="url"
                            name="youtube_url"
                            value={formData.youtube_url}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        />
                        <label htmlFor="published" style={{ fontWeight: 600 }}>
                            Publish immediately
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <Button type="submit" loading={saving}>
                            Save Story
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
