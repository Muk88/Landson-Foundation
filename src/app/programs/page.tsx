'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'
import { Icon } from '@/lib/icons'

// Force re-check


export default function ProgramsPage() {
    const [programs, setPrograms] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    const [activeCard, setActiveCard] = React.useState<number | null>(null)

    React.useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('/api/programs')
                const data = await response.json()

                if (data.programs) {
                    const formattedPrograms = data.programs.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        image: item.image_url,
                        slug: item.slug,
                        icon_name: item.icon_name || item.icon
                    }))
                    setPrograms(formattedPrograms)
                }
            } catch (error) {
                console.error('Error fetching programs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPrograms()
    }, [])

    React.useEffect(() => {
        // Only run on client-side and when programs are loaded
        if (typeof window === 'undefined' || loading || programs.length === 0) return

        // Check if we are on mobile
        const isMobile = window.innerWidth <= 768
        if (!isMobile) return

        const observerOptions = {
            root: null, // viewport
            rootMargin: '-20% 0px', // Activate when card is in the central 60% of screen vertically
            threshold: 0.5 // 50% of the card must be visible
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-program-index'))
                    if (!isNaN(index)) {
                        setActiveCard(index)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const cards = document.querySelectorAll('[data-program-index]')
        cards.forEach(card => observer.observe(card))

        return () => observer.disconnect()
    }, [loading, programs.length])

    const timelineSteps = [
        {
            title: 'Scouting & Identification',
            description:
                'We identify talented young athletes in Nandi through school competitions, community events, and recommendations from coaches and teachers.',
        },
        {
            title: 'Assessment & Selection',
            description:
                'Selected athletes undergo evaluation of both athletic potential and academic performance to ensure they can benefit from our comprehensive support.',
        },
        {
            title: 'Training & Education',
            description:
                'Athletes receive scholarships for their education while participating in structured training programs and mentorship sessions.',
        },
        {
            title: 'University & Professional Career',
            description:
                'We support athletes through university education and help them transition to professional athletic careers or other fields of their choice.',
        },
    ]

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Image
                        src="/images/programs-hero.jpg"
                        alt="Our Programs"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    {/* Floating athlete PNG cutout */}
                    <div className={styles.heroAthleteFloat}>
                        <Image
                            src="/images/athletes_1.png"
                            alt="Landson Athlete"
                            width={400}
                            height={580}
                            style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
                            priority
                        />
                    </div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Our Programs</h1>
                        <p>Empowering athletes through comprehensive support</p>
                    </div>
                </section>

                {/* Programs Section */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        {loading ? (
                            <div className={styles.programsGrid}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={styles.programCard} style={{ opacity: 0.6 }}>
                                        <div className={styles.programImage} style={{ background: '#e0e0e0' }} />
                                        <div className={styles.programContent}>
                                            <div style={{ height: '28px', background: '#e0e0e0', marginBottom: '12px', borderRadius: '4px', width: '70%' }} />
                                            <div style={{ height: '80px', background: '#e0e0e0', borderRadius: '4px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.programsGrid}>
                                {programs.map((program, index) => {
                                    const isActive = activeCard === index
                                    const cardClasses = `${styles.programCard} ${isActive ? styles.mobileActive : ''}`

                                    const CardContent = (
                                        <>
                                            <div className={styles.programImage}>
                                                <Image
                                                    src={program.image}
                                                    alt={program.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                <div className={styles.overlay} />
                                                {program.icon_name && (
                                                    <div className={styles.programIcon}>
                                                        <Icon name={program.icon_name} size={32} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.programContent}>
                                                <h3>{program.title}</h3>
                                                <p className={styles.truncateText}>{program.description}</p>

                                                <span className={styles.readMoreLink}>
                                                    {program.slug ? 'Read More' : 'Coming Soon'}
                                                    {program.slug && <Icon name="arrow-right" size={16} />}
                                                </span>
                                            </div>
                                        </>
                                    )

                                    if (program.slug) {
                                        return (
                                            <Link
                                                key={index}
                                                href={`/programs/${program.slug}`}
                                                className={cardClasses}
                                                data-program-index={index}
                                                style={{ animationDelay: `${index * 0.1}s`, display: 'block', textDecoration: 'none' }}
                                            >
                                                {CardContent}
                                            </Link>
                                        )
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={cardClasses}
                                            data-program-index={index}
                                            style={{ animationDelay: `${index * 0.1}s`, cursor: 'default' }}
                                        >
                                            {CardContent}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* Timeline Section */}
                <section className={`${styles.section} ${styles.timelineSection}`}>
                    <div className={styles.container}>
                        <h2 className={styles.timelineTitle}>The Journey to Success</h2>
                        <div className={styles.timeline}>
                            {timelineSteps.map((step, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineContent}>
                                        <h4>{step.title}</h4>
                                        <p>{step.description}</p>
                                    </div>
                                    <div className={styles.timelineDot}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
