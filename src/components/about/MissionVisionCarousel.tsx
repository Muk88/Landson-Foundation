'use client'

import React, { useEffect, useState } from 'react'
import styles from './MissionVisionCarousel.module.css'

const missions = [
    {
        title: 'Identify & Nurture',
        description: 'To identify young athletes with exceptional potential and nurture their talents through comprehensive support systems that balance athletics and academics.',
        icon: (
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        title: 'Educate & Empower',
        description: 'To provide access to quality education through scholarships and resources, ensuring no talented athlete has to choose between their passion and their future.',
        icon: (
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        )
    },
    {
        title: 'Transform & Inspire',
        description: 'To transform lives by creating pathways to success both on and off the track, inspiring future generations to pursue excellence in all areas of life.',
        icon: (
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
]

export default function MissionVisionCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!isMobile) return

        const interval = setInterval(() => {
            if (isPaused) return

            setCurrentIndex(prev => {
                const next = prev + 1
                setIsTransitioning(true)
                return next
            })
        }, 4500)

        return () => clearInterval(interval)
    }, [isPaused, isMobile])

    useEffect(() => {
        if (!isMobile) return

        if (currentIndex === missions.length) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(0)
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, isMobile])

    return (
        <section className={`${styles.section} ${styles.missionSection}`}>
            <div className={styles.container}>
                <div className={styles.missionHeader}>
                    <h2>Our Commitment</h2>
                    <p>Our index to empowering Kenya's athletes through education</p>
                </div>

                <div
                    className={styles.missionWrapper}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
                >
                    <div
                        className={styles.missionGrid}
                        style={isMobile ? {
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                        } : {}}
                    >
                        {missions.map((mission, index) => (
                            <div key={`original-${index}`} className={styles.missionCard}>
                                <div className={styles.missionIcon}>
                                    {mission.icon}
                                </div>
                                <h3>{mission.title}</h3>
                                <p>{mission.description}</p>
                            </div>
                        ))}
                        {/* Duplicates for Mobile Loop */}
                        {missions.map((mission, index) => (
                            <div key={`duplicate-${index}`} className={`${styles.missionCard} ${styles.duplicateCard}`}>
                                <div className={styles.missionIcon}>
                                    {mission.icon}
                                </div>
                                <h3>{mission.title}</h3>
                                <p>{mission.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {isMobile && (
                    <div className={styles.indicators}>
                        {missions.map((_, idx) => (
                            <span
                                key={idx}
                                className={`${styles.dot} ${currentIndex % missions.length === idx ? styles.activeDot : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
