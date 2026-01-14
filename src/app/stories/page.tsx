'use client'

import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'

export default function StoriesPage() {
    const stories = [
        {
            id: 1,
            name: 'Nimrod Korir',
            achievement: 'NCAA Division I Scholarship',
            story: 'From the hills of Nandi to competing at the highest level of collegiate athletics in the United States. Nimrod trained at Kaptagat before departing for his scholarship, where he now excels both academically and athletically.',
            image: '/images/runner.jpg',
            year: '2023',
            university: 'US University'
        },
        {
            id: 2,
            name: 'Dismas Kipchumba',
            achievement: 'International Athletics Scholarship',
            story: 'Identified through our scouting program, Dismas received comprehensive support including training gear, coaching, and scholarship preparation. His dedication to both education and athletics has opened doors to international opportunities.',
            image: '/images/training.jpg',
            year: '2023',
            university: 'US University'
        },
        {
            id: 3,
            name: 'Vivian Chepkemei',
            achievement: 'Academic & Athletic Excellence',
            story: 'Vivian represents the perfect balance of athletic talent and academic ambition. Through Landson Foundation support, she trained at Kaptagat and secured a scholarship that allows her to pursue her dreams without choosing between education and athletics.',
            image: '/images/future.jpg',
            year: '2023',
            university: 'US University'
        },
        {
            id: 4,
            name: 'Rising Stars Program',
            achievement: '150+ Athletes Equipped',
            story: 'Through partnerships with Team Landson Perth and The Running Center in Australia, we distributed 150 pairs of running shoes and training gear to primary and secondary school students in Mosoriot, removing financial barriers to participation.',
            image: '/images/education.jpg',
            year: '2024',
            university: 'Community Impact'
        }
    ]

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
                                <div key={story.id} className={styles.storyCard} style={{ animationDelay: `${index * 0.1}s` }}>
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
                                        <p>{story.story}</p>
                                    </div>
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
