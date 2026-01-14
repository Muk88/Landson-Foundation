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
        .eq('published', true)
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
        title: `${story.athlete_name} | Success Stories | Landson Foundation`,
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
            <main>
                <div className={styles.container}>
                    <Link href="/stories" className={styles.backLink}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Stories
                    </Link>

                    <div className={styles.header}>
                        <h1 className={styles.athleteName}>{story.athlete_name}</h1>
                        <p className={styles.achievement}>{story.achievement}</p>
                    </div>

                    <div className={styles.featuredImage}>
                        <Image
                            src={story.image_url}
                            alt={story.athlete_name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    <div className={styles.content}>
                        <p>{story.story_content}</p>
                    </div>

                    {youtubeId && (
                        <div className={styles.videoContainer}>
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title={`${story.athlete_name} video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
