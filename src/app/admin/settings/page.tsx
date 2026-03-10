'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: '',
        facebook_url: '',
        twitter_url: '',
        instagram_url: '',
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchContactInfo()
    }, [])

    const fetchContactInfo = async () => {
        try {
            const response = await fetch('/api/contact')
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setFormData({
                        email: data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        facebook_url: data.facebook_url || '',
                        twitter_url: data.twitter_url || '',
                        instagram_url: data.instagram_url || '',
                    })
                }
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
            setMessage({ type: 'error', text: 'Failed to load settings' })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ type: '', text: '' })

        try {
            const response = await fetch('/api/contact', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update settings')
            }

            setMessage({ type: 'success', text: 'Settings updated successfully' })
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className={styles.loading}>Loading settings...</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
                <p>Manage general site configuration and contact details.</p>
            </div>

            <div className={styles.card}>
                <h2>Contact Information</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Organization Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address / Location</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                        />
                    </div>

                    <h2>Social Media Links</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="facebook_url">Facebook URL</label>
                        <input
                            type="url"
                            id="facebook_url"
                            name="facebook_url"
                            value={formData.facebook_url}
                            onChange={handleChange}
                            placeholder="https://facebook.com/..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="twitter_url">Twitter URL</label>
                        <input
                            type="url"
                            id="twitter_url"
                            name="twitter_url"
                            value={formData.twitter_url}
                            onChange={handleChange}
                            placeholder="https://twitter.com/..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="instagram_url">Instagram URL</label>
                        <input
                            type="url"
                            id="instagram_url"
                            name="instagram_url"
                            value={formData.instagram_url}
                            onChange={handleChange}
                            placeholder="https://instagram.com/..."
                        />
                    </div>

                    {message.text && (
                        <div className={`${styles.message} ${styles[message.type]}`}>
                            {message.text}
                        </div>
                    )}

                    <div className={styles.submitButton}>
                        <Button type="submit" loading={saving}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
