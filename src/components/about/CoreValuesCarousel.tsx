'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './CoreValuesCarousel.module.css'

const values = [
    {
        title: 'Excellence',
        description: 'We strive for the highest standards in everything we do, from athlete development to educational support'
    },
    {
        title: 'Integrity',
        description: 'We operate with transparency, honesty, and accountability in all our programs and partnerships'
    },
    {
        title: 'Empowerment',
        description: 'We believe in empowering athletes to take control of their futures through education and opportunity'
    },
    {
        title: 'Community',
        description: 'We are deeply rooted in Nandi County, working hand-in-hand with local communities to create lasting change'
    }
]

export default function CoreValuesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Check for mobile on mount/resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!isMobile) return // No auto-scroll on desktop grid

        const interval = setInterval(() => {
            if (isPaused) return

            setCurrentIndex(prev => {
                // Determine next index
                const next = prev + 1
                setIsTransitioning(true)
                return next
            })
        }, 4500)

        return () => clearInterval(interval)
    }, [isPaused, isMobile])

    // Handle Seamless Loop Reset
    useEffect(() => {
        if (!isMobile) return

        // If we reached the end of the original set (index === values.length)
        // We are now showing the first duplicate. 
        // We need to wait for the transition to finish, then snap back to index 0 (real first item)
        if (currentIndex === values.length) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false) // Disable transition for instant snap
                setCurrentIndex(0)
            }, 500) // Match CSS transition duration

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, isMobile])

    return (
        <section id="core-values" className={styles.valuesSection}>
            <div className={styles.container}>
                <div className={styles.missionHeader}>
                    <h2><span>Our Core Values</span></h2>
                    <p>The principles that guide our work in Mosoriot and beyond</p>
                </div>

                <div
                    className={styles.valuesWrapper}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
                >
                    <div
                        className={styles.valuesGrid}
                        style={isMobile ? {
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                        } : {}}
                    >
                        {/* Render Loop: Original Set + Duplicate Set (for seamless mobile scrolling) */}
                        {values.map((value, index) => (
                            <div key={`original-${index}`} className={styles.valueCard}>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                        {/* Only needed for mobile loop illusion */}
                        {values.map((value, index) => (
                            <div key={`duplicate-${index}`} className={`${styles.valueCard} ${styles.duplicateCard}`}>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Indicators (Optional, helpful for context) */}
                {isMobile && (
                    <div className={styles.indicators}>
                        {values.map((_, idx) => (
                            <span
                                key={idx}
                                className={`${styles.dot} ${currentIndex % values.length === idx ? styles.activeDot : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
