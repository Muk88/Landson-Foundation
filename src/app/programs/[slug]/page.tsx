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

// Server Component
export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: program, error } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (error || !program) {
        // If not found by slug, try ID for backward compatibility? No, slug is mandatory now.
        notFound()
    }

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroImage}>
                    <Image
                        src={program.image_url || '/images/background1.jpg'}
                        alt={program.title}
                        fill
                        className={styles.image}
                        priority
                    />
                    <div className={styles.overlay}></div>
                </div>

                <Link href="/programs" className={styles.backBtn} aria-label="Back to Programs">
                    <Icon name="arrow-left" size={24} />
                </Link>

                <div className={styles.heroContent}>
                    <div className={styles.iconWrapper}>
                        {program.icon_name && <Icon name={program.icon_name} size={48} className={styles.heroIcon} />}
                    </div>
                    <h1 className={styles.title}>{program.title}</h1>
                    <div className={styles.breadcrumbs}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/programs">Programs</Link>
                        <span>/</span>
                        <span>{program.title}</span>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.description}>
                        <h2>About the Program</h2>
                        <div className={styles.textBlock}>
                            {program.description.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* YouTube Section - Only visible if link exists */}
                {program.youtube_url && (
                    <div className={styles.container} style={{ marginBottom: '4rem' }}>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeId(program.youtube_url)}`}
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
                    {program.images && program.images.length > 0 && (
                        <div className={styles.gallery}>
                            <div className={styles.grid}>
                                {program.images.map((img: string, index: number) => (
                                    <div key={index} className={styles.galleryItem}>
                                        <Image
                                            src={img}
                                            alt={`${program.title} gallery ${index + 1}`}
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
                    <h2>Partner with this Program</h2>
                    <div className={styles.ctaButtons}>
                        <Link href="/donate" className={styles.donateBtn}>
                            <Icon name="heart" size={20} />
                            Donate to Program
                        </Link>
                        <Link href="/contact" className={styles.contactBtn}>
                            <Icon name="users" size={20} />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section Moved Up */}
        </main >
    )
}
