'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { getAdminPath } from '@/lib/admin-path'
import styles from './page.module.css'

export default function AdminLoginPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Sign in directly with Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })

            if (error) throw error

            if (data.session) {
                // Store session for layout check (optional, but keeps existing logic working)
                localStorage.setItem('admin_session', JSON.stringify(data.session))
                // Redirect to admin dashboard
                router.push(adminPath)
            }
        } catch (err: any) {
            console.error('Login error:', err)
            setError(err.message || 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <h1>LANDSON</h1>
                    <p>Admin Portal</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className={styles.submitButton}>
                        <Button type="submit" fullWidth loading={loading}>
                            Sign In
                        </Button>
                    </div>
                </form>

                <div className={styles.backLink}>
                    <Link href="/">← Back to Website</Link>
                </div>
            </div>
        </div>
    )
}
