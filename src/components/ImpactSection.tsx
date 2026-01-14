'use client'

import React, { useEffect, useState } from 'react'
import { supabase, type ImpactMetrics } from '@/lib/supabase'
import styles from './ImpactSection.module.css'

export default function ImpactSection() {
    const [metrics, setMetrics] = useState<ImpactMetrics | null>(null)

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const { data, error } = await supabase
                    .from('impact_metrics')
                    .select('*')
                    .single()

                if (error) throw error
                setMetrics(data)
            } catch (error) {
                console.error('Error fetching metrics:', error)
            }
        }

        fetchMetrics()
    }, [])

    return (
        <section className={styles.impactSection}>
            <div className={styles.impactContainer}>
                <div className={styles.impactContent}>
                    <h2 className={styles.impactTitle}>
                        We Take Action. To Make Better Changes
                    </h2>
                    <p className={styles.impactDescription}>
                        We believe that by integrating sustainable solutions, community engagement, and
                        youth leadership, we can build a future that is resilient, inclusive, and
                        environmentally conscious.
                    </p>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div className={styles.statNumber}>
                                {metrics?.athletes_supported.toLocaleString() || '0'}
                            </div>
                            <div className={styles.statLabel}>Athletes Supported</div>
                        </div>

                        <div className={styles.statItem}>
                            <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <div className={styles.statNumber}>
                                {metrics?.school_fees_paid.toLocaleString() || '0'}
                            </div>
                            <div className={styles.statLabel}>School Fees Paid</div>
                        </div>

                        <div className={styles.statItem}>
                            <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <div className={styles.statNumber}>
                                {metrics?.medals_won.toLocaleString() || '0'}
                            </div>
                            <div className={styles.statLabel}>Medals Won</div>
                        </div>
                    </div>
                </div>

                <div className={styles.impactImages}>
                    <div className={styles.imageWrapper}>
                        <img src="/images/education.jpg" alt="Community engagement" />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src="/images/training.jpg" alt="Athletic training" />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src="/images/stories-hero.jpg" alt="Youth leadership" />
                    </div>
                </div>
            </div>
        </section>
    )
}
