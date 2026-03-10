import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabaseAdmin } from '@/lib/supabase'
import styles from './page.module.css'

interface StoryPageProps {
    params: {
        id: string
    }
}

async function getStory(id: string) {
    const { data, error } = await supabaseAdmin
        .from('success_stories')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        return null
    }

    return data
}

export async function generateMetadata({ params }: StoryPageProps) {
    const story = await getStory(params.id)

    if (!story) {
        return {
            title: 'Story Not Found | Landson Foundation',
        }
    }

    return {
        title: `${story.name} | Success Stories | Landson Foundation`,
        description: story.achievement,
    }
}

export default async function StoryPage({ params }: StoryPageProps) {
    const story = await getStory(params.id)

    if (!story) {
        notFound()
    }

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const youtubeId = story.youtube_url ? getYouTubeId(story.youtube_url) : null

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <div className={styles.heroImage}>
                        <Image
                            src={story.image_url}
                            alt={story.name}
                            fill
                            className={styles.image}
                            priority
                        />
                        <div className={styles.overlay}></div>
                    </div>

                    <Link href="/stories" className={styles.backBtn}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>

                    <div className={styles.heroContent}>
                        <div className={styles.breadcrumbs}>
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <Link href="/stories">Success Stories</Link>
                            <span>/</span>
                            <span>{story.name}</span>
                        </div>
                        <h1 className={styles.title}>{story.name}</h1>
                        <div className={styles.subtitle}>{story.achievement}</div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                    <div className={styles.container}>
                        <div className={styles.description}>
                            <h2>The Story</h2>
                            <div className={styles.textBlock}>
                                <p>{story.story}</p>
                            </div>

                            {youtubeId && (
                                <div style={{ marginTop: '2rem' }}>
                                    <h3>Watch Interview</h3>
                                    <div className={styles.videoWrapper}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title={`${story.name} video`}
                                            className={styles.iframe}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaCard}>
                        <h2>Help Create More Success Stories</h2>
                        <div className={styles.ctaButtons}>
                            <Link href="/donate" className={styles.donateBtn}>
                                Donate Now
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>
                            <Link href="/contact" className={styles.contactBtn}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
