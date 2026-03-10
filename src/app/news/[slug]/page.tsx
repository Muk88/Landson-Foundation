import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import styles from './page.module.css'
import { Icon } from '@/lib/icons'

// Helper to extract video ID
function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
}

export const revalidate = 0

// Server Component
export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: newsItem, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (error || !newsItem) {
        notFound()
    }

    return (
        <main className={styles.main}>
            <div className={styles.bgShape}></div>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroImage}>
                    <Image
                        src={newsItem.image_url || '/images/background2.jpg'}
                        alt={newsItem.title}
                        fill
                        className={styles.image}
                        priority
                    />
                    <div className={styles.overlay}></div>
                </div>

                <Link href="/news" className={styles.backBtn} aria-label="Back to News">
                    <Icon name="arrow-left" size={24} />
                </Link>

                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{newsItem.title}</h1>
                    <div className={styles.breadcrumbs}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/news">News</Link>
                        <span>/</span>
                        <span>{newsItem.title}</span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.description}>
                        <h2>{new Date(newsItem.published_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h2>
                        <div className={styles.textBlock}>
                            {newsItem.content.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* YouTube Section - Only visible if link exists */}
                {newsItem.youtube_url && (
                    <div className={styles.container} style={{ marginBottom: '4rem' }}>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeId(newsItem.youtube_url)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles.iframe}
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Gallery Section */}
                <div className={styles.container}>
                    {newsItem.images && newsItem.images.length > 0 && (
                        <div className={styles.gallery}>
                            <div className={styles.grid}>
                                {newsItem.images.map((img: string, index: number) => (
                                    <div key={index} className={styles.galleryItem}>
                                        <Image
                                            src={img}
                                            alt={`${newsItem.title} gallery ${index + 1}`}
                                            fill
                                            className={styles.galleryImage}
                                        />
                                        <div className={styles.galleryOverlay}>
                                            <a
                                                href={img}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.downloadBtn}
                                                download
                                                title="Download Image"
                                            >
                                                <Icon name="download" size={24} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Partner / CTA Section - Footer Style */}
                <div className={styles.ctaCard}>
                    <h2>Support Our Mission</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
                        Help us continue to share inspiring stories and make a difference.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/donate" className={styles.donateBtn}>
                            <Icon name="heart" size={20} />
                            Donate
                        </Link>
                        <Link href="/contact" className={styles.contactBtn}>
                            <Icon name="users" size={20} />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
