'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './AthleteShowcase.module.css'

const athletes = [
    {
        image: '/images/athlete 2.jpg',
        name: 'Track & Field',
        tagline: 'Born to run. Built to succeed.',
        stat: '100+',
        statLabel: 'Athletes Supported',
    },
    {
        image: '/images/athletes 1.jpg',
        name: 'Long Distance',
        tagline: 'Nandi\'s finest. Kenya\'s pride.',
        stat: '40+',
        statLabel: 'Scholarships Awarded',
    },
    {
        image: '/images/athlete 3.jpg',
        name: 'Cross Country',
        tagline: 'From the highlands to the world.',
        stat: '15+',
        statLabel: 'International Athletes',
    },
    {
        image: '/images/runner.jpg',
        name: 'Elite Training',
        tagline: 'Excellence is our standard.',
        stat: '7+',
        statLabel: 'Years of Impact',
    },
]

export default function AthleteShowcase() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <span className={styles.badge}>Our Athletes</span>
                <h2 className={styles.title}>
                    Our Athletes. <span>Our Pride.</span>
                </h2>
                <p className={styles.subtitle}>
                    Every runner carries the dreams of Nandi County. We ensure those dreams reach the world stage.
                </p>
            </div>

            <div className={styles.grid}>
                {athletes.map((athlete, index) => (
                    <div key={index} className={styles.card}>
                        <Image
                            src={athlete.image}
                            alt={athlete.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardOverlay} />
                        <div className={styles.cardContent}>
                            <span className={styles.sport}>{athlete.name}</span>
                            <p className={styles.tagline}>{athlete.tagline}</p>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>{athlete.stat}</span>
                                <span className={styles.statLabel}>{athlete.statLabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cta}>
                <Link href="/programs" className={styles.ctaBtn}>
                    View Our Programs
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
                <Link href="/stories" className={styles.ctaBtnSecondary}>
                    Read Their Stories
                </Link>
            </div>
        </section>
    )
}
