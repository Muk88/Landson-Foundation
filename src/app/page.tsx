'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import WelcomeSection from '@/components/WelcomeSection'
import ImpactSection from '@/components/ImpactSection'
import TextCarousel from '@/components/TextCarousel'
import styles from './page.module.css'

export default function HomePage() {
    const router = useRouter()

    const trioCards = [
        {
            title: 'The Talent',
            description: 'Identifying and nurturing exceptional athletic talent in Nandi County. We scout young athletes with potential and provide them with the support they need to excel in their sport while pursuing education.',
            label: 'Athletic Development',
            image: '/images/runner.jpg',
            link: '/programs',
        },
        {
            title: 'The Education',
            description: 'Providing comprehensive scholarship programs and academic support to talented athletes. We ensure that education remains a priority alongside athletic training, creating well-rounded individuals.',
            label: 'Scholarship Program',
            image: '/images/education.jpg',
            link: '/programs',
        },
        {
            title: 'The Future',
            description: 'Building champions both on the track and in life. Our holistic approach prepares athletes for success in any field they choose, creating leaders who give back to their communities.',
            label: 'Success Stories',
            image: '/images/future.jpg',
            link: '/stories',
        },
    ]

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <video
                        className={styles.videoBackground}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <h1 className={styles.headline}>Talent for Education</h1>
                        <p className={styles.subheadline}>
                            Empowering Nandi's athletes through scholarships and mentorship
                        </p>
                        <TextCarousel />
                        <div className={styles.ctaButtons}>
                            <Link href="/donate">
                                <Button size="large">Support Our Athletes</Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="secondary" size="large">
                                    Our Story
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Welcome Section - Our Story & Key Focus */}
                <WelcomeSection />

                {/* Visual Trio Section */}
                <section className={styles.trioSection}>
                    <div className={styles.trioGrid}>
                        {trioCards.map((card, index) => (
                            <Card
                                key={index}
                                title={card.title}
                                description={card.description}
                                label={card.label}
                                imageSrc={card.image}
                                imageAlt={card.title}
                                onClick={() => router.push(card.link)}
                                className={styles.trioCard}
                            />
                        ))}
                    </div>
                </section>

                {/* Latest News Section */}
                <section className={styles.newsSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Latest News</h2>
                            <p>Stay updated with our recent achievements and milestones</p>
                        </div>
                        <div className={styles.newsGrid}>
                            <div className={styles.newsCard} onClick={() => router.push('/news')}>
                                <div className={styles.newsImageContainer}>
                                    <Image
                                        src="/images/education.jpg"
                                        alt="Australian High Commissioner Meeting"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className={styles.newsTag}>Partnership</div>
                                </div>
                                <div className={styles.newsCardContent}>
                                    <div className={styles.newsDate}>January 2026</div>
                                    <h3>Founder Meets Australian High Commissioner</h3>
                                    <Button size="small" onClick={(e) => { e.stopPropagation(); router.push('/news'); }}>
                                        Read More
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.newsCard} onClick={() => router.push('/news')}>
                                <div className={styles.newsImageContainer}>
                                    <Image
                                        src="/images/future.jpg"
                                        alt="Foundation Facility"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className={styles.newsTag}>Infrastructure</div>
                                </div>
                                <div className={styles.newsCardContent}>
                                    <div className={styles.newsDate}>December 2025</div>
                                    <h3>Dream Realized: Facility Construction Complete</h3>
                                    <Button size="small" onClick={(e) => { e.stopPropagation(); router.push('/news'); }}>
                                        Read More
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.newsCard} onClick={() => router.push('/news')}>
                                <div className={styles.newsImageContainer}>
                                    <Image
                                        src="/images/runner.jpg"
                                        alt="Scholarship Recipients"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className={styles.newsTag}>Success</div>
                                </div>
                                <div className={styles.newsCardContent}>
                                    <div className={styles.newsDate}>October 2025</div>
                                    <h3>Three Athletes Secure US Scholarships</h3>
                                    <Button size="small" onClick={(e) => { e.stopPropagation(); router.push('/news'); }}>
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.viewAllNews}>
                            <Button onClick={() => router.push('/news')}>View All News</Button>
                        </div>
                    </div>
                </section>

                {/* Modern Impact Section */}
                <ImpactSection />
            </main>
            <Footer />
        </>
    )
}
