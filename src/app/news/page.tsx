'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import styles from './page.module.css'
import { Icon } from '@/lib/icons'

export default function NewsPage() {
    const [expandedItems, setExpandedItems] = useState<number[]>([])

    const toggleExpand = (id: number) => {
        setExpandedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const [newsItems, setNewsItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch news from API
    React.useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news')
                const data = await response.json()

                if (data.news) {
                    // Map API data to UI format
                    const formattedNews = data.news.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                        date: new Date(item.published_date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                        }),
                        category: item.category,
                        image: item.image_url,
                        excerpt: item.excerpt,
                        content: item.content
                    }))
                    setNewsItems(formattedNews)
                }
            } catch (error) {
                console.error('Error fetching news:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Image
                        src="/images/background2.jpg"
                        alt="News & Updates"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>News & Updates</h1>
                        <p>Stay informed about our latest achievements and milestones</p>
                    </div>
                </section>

                {/* News Grid */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        {loading ? (
                            <div className={styles.newsGrid}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={styles.newsCard} style={{ opacity: 0.6 }}>
                                        <div className={styles.newsImage} style={{ background: '#e0e0e0' }} />
                                        <div className={styles.newsContent}>
                                            <div style={{ height: '20px', background: '#e0e0e0', marginBottom: '10px', borderRadius: '4px' }} />
                                            <div style={{ height: '24px', background: '#e0e0e0', marginBottom: '10px', borderRadius: '4px' }} />
                                            <div style={{ height: '60px', background: '#e0e0e0', borderRadius: '4px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.newsGrid}>
                                {newsItems.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.slug || '#'}`}
                                        className={styles.newsCard}
                                        style={{ animationDelay: `${index * 0.1}s`, display: 'block', textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className={styles.newsImage}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div className={styles.newsCategory}>{item.category}</div>
                                        </div>
                                        <div className={styles.newsContent}>
                                            <div className={styles.newsDate}>{item.date}</div>
                                            <h2>{item.title}</h2>
                                            <p className={styles.newsExcerpt}>{item.excerpt}</p>

                                            <span className={styles.readMore} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#e31e24', marginTop: '1rem' }}>
                                                Read More <Icon name="arrow-right" size={16} />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
