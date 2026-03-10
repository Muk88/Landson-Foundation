'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import AthleteShowcase from '@/components/AthleteShowcase'
import styles from './page.module.css'

// Dynamic imports for performance optimization
const WelcomeSection = dynamic(() => import('@/components/WelcomeSection'), {
    loading: () => <div style={{ minHeight: '400px' }} />
})
const ImpactSection = dynamic(() => import('@/components/ImpactSection'), {
    loading: () => <div style={{ minHeight: '500px' }} />
})
const TextCarousel = dynamic(() => import('@/components/TextCarousel'), {
    loading: () => <div style={{ minHeight: '60px' }} />
})
const TrioCarousel = dynamic(() => import('@/components/TrioCarousel'), {
    loading: () => <div style={{ minHeight: '400px' }} />
})

export default function HomePage() {
    const router = useRouter()
    const [latestNews, setLatestNews] = React.useState<any[]>([])

    React.useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&limit=3')
                const data = await response.json()

                if (data.news) {
                    const formattedNews = data.news.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        date: new Date(item.published_date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                        }),
                        category: item.category,
                        image: item.image_url
                    }))
                    setLatestNews(formattedNews)
                }
            } catch (error) {
                console.error('Error fetching latest news:', error)
            }
        }

        fetchLatestNews()
    }, [])

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
                    {/* Floating athlete PNG cutout */}
                    <div className={styles.heroAthleteFloat}>
                        <Image
                            src="/images/athlete_4.png"
                            alt="Landson Athlete"
                            width={480}
                            height={680}
                            style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
                            priority
                        />
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.headline}>Talent for Education</h1>
                        <p className={styles.subheadline}>
                            Empowering Kenya's athletes through scholarships and mentorship
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

                {/* Athlete Showcase */}
                <AthleteShowcase />

                {/* Latest News Section */}
                <section className={styles.newsSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2><span>Latest News</span></h2>
                            <p>Stay updated with our recent achievements and milestones</p>
                        </div>
                        <div className={styles.newsGrid}>
                            {latestNews.map((news) => (
                                <div key={news.id} className={styles.newsCard} onClick={() => router.push('/news')}>
                                    <div className={styles.newsImageContainer}>
                                        <Image
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className={styles.newsTag}>{news.category}</div>
                                    </div>
                                    <div className={styles.newsCardContent}>
                                        <div className={styles.newsDate}>{news.date}</div>
                                        <h3>{news.title}</h3>
                                        <Button size="small" onClick={(e) => { e.stopPropagation(); router.push('/news'); }}>
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.viewAllNews}>
                            <Button onClick={() => router.push('/news')}>View All News</Button>
                        </div>
                    </div>
                </section>

                {/* Modern Impact Section */}
                <ImpactSection />

                {/* Visual Trio Section */}
                <section className={styles.trioSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Our Three Pillars</h2>
                        <p>The foundation of everything we do</p>
                    </div>
                    <TrioCarousel cards={trioCards} />
                </section>
            </main>
            <Footer />
        </>
    )
}
