'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'

export default function StoriesPage() {
    const [stories, setStories] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('/api/stories')
                const data = await response.json()

                if (data.stories) {
                    const formattedStories = data.stories.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        achievement: item.title, // Maps to main headline (H4)
                        story: item.story,
                        image: item.image_url,
                        year: item.year,
                        university: item.achievement // Maps to badge
                    }))
                    setStories(formattedStories)
                }
            } catch (error) {
                console.error('Error fetching stories:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStories()
    }, [])

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Image
                        src="/images/stories-hero.jpg"
                        alt="Success Stories"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Success Stories</h1>
                        <p>Transforming lives through education and athletics</p>
                    </div>
                </section>

                {/* Stories Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.storiesGrid}>
                            {stories.map((story, index) => (
                                <Link href={`/stories/${story.id}`} key={story.id} className={styles.storyCard} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={styles.storyImage}>
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className={styles.storyYear}>{story.year}</div>
                                    </div>
                                    <div className={styles.storyContent}>
                                        <div className={styles.storyHeader}>
                                            <h3>{story.name}</h3>
                                            <span className={styles.storyBadge}>{story.university}</span>
                                        </div>
                                        <h4>{story.achievement}</h4>
                                        <p>{story.story.substring(0, 150)}...</p>
                                        <div className={styles.readMore}>
                                            Read Story
                                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
