'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export default function AdminDashboard() {
    const router = useRouter()
    const [stats, setStats] = useState({
        totalStories: 0,
        unreadMessages: 0,
        totalDonations: 0,
    })

    useEffect(() => {
        async function fetchStats() {
            try {
                // Get total stories
                const { count: storiesCount } = await supabase
                    .from('success_stories')
                    .select('*', { count: 'exact', head: true })

                // Get unread messages
                const { count: messagesCount } = await supabase
                    .from('contact_messages')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_read', false)

                // Get total donations
                const { count: donationsCount } = await supabase
                    .from('donations')
                    .select('*', { count: 'exact', head: true })
                    .eq('payment_status', 'success')

                setStats({
                    totalStories: storiesCount || 0,
                    unreadMessages: messagesCount || 0,
                    totalDonations: donationsCount || 0,
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [])

    const quickLinks = [
        { title: 'Update Metrics', description: 'Update impact counters', href: '/admin/metrics' },
        { title: 'Add Story', description: 'Create new success story', href: '/admin/stories/new' },
        { title: 'View Messages', description: 'Check contact messages', href: '/admin/messages' },
        { title: 'View Donations', description: 'Track donations', href: '/admin/donations' },
    ]

    return (
        <>
            <div className="header">
                <h1>Dashboard</h1>
                <p>Welcome to the Landson Foundation Admin Portal</p>
            </div>

            <div className="content">
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Total Stories</div>
                        <div className={styles.statValue}>{stats.totalStories}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Unread Messages</div>
                        <div className={styles.statValue}>{stats.unreadMessages}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Total Donations</div>
                        <div className={styles.statValue}>{stats.totalDonations}</div>
                    </div>
                </div>

                <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-red)' }}>
                    Quick Actions
                </h2>
                <div className={styles.quickLinks}>
                    {quickLinks.map((link) => (
                        <div
                            key={link.href}
                            className={styles.linkCard}
                            onClick={() => router.push(link.href)}
                        >
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
