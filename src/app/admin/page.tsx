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

                setStats({
                    totalStories: storiesCount || 0,
                    unreadMessages: messagesCount || 0,
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        fetchStats()
    }, [])

    const quickLinks = [
        {
            title: 'Update Metrics',
            description: 'Update the impact counters on homepage',
            href: '/admin/metrics',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: 'Add Story',
            description: 'Create and publish a new success story',
            href: '/admin/stories/new',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            title: 'Check Messages',
            description: `You have ${stats.unreadMessages} unread messages`,
            href: '/admin/messages',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
    ]

    return (
        <>
            <div className="header" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--color-gray-600)' }}>Welcome back to the admin portal</p>
            </div>

            <div className={styles.statsGrid}>
                {/* Stories Widget */}
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Success Stories</span>
                        <span className={styles.statValue}>{stats.totalStories}</span>
                    </div>
                    <div className={`${styles.statIcon} ${styles.blue}`}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                </div>

                {/* Messages Widget */}
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Unread Messages</span>
                        <span className={styles.statValue}>{stats.unreadMessages}</span>
                    </div>
                    <div className={`${styles.statIcon} ${styles.red}`}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
            </div>

            <div className={styles.quickLinks}>
                {quickLinks.map((link) => (
                    <div
                        key={link.href}
                        className={styles.linkCard}
                        onClick={() => router.push(link.href)}
                    >
                        <div className={styles.linkHeader}>
                            <div className={styles.linkIcon}>
                                {link.icon}
                            </div>
                            <h3>{link.title}</h3>
                        </div>
                        <p>{link.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
