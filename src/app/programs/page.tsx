import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata = {
    title: 'Our Programs | Landson Foundation',
    description: 'Discover our scholarship, training, and mentorship programs for athletes',
}

export default function ProgramsPage() {
    const programs = [
        {
            title: 'Scholarship Fund',
            description:
                'We provide full and partial scholarships to talented athletes, covering school fees, uniforms, books, and other educational expenses. Our scholarship program ensures that financial constraints never stand in the way of academic excellence.',
            image: '/images/scholarship.jpg',
        },
        {
            title: 'Athletic Training',
            description:
                'Beyond education, we support athletic development through training camps, quality running gear, and access to professional coaching. We believe in nurturing both the mind and the body.',
            image: '/images/training.jpg',
        },
        {
            title: 'Mentorship Program',
            description:
                'We connect young athletes with successful professionals and former athletes who provide guidance, inspiration, and real-world advice on balancing sports, education, and life goals.',
            image: '/images/mentorship.jpg',
        },
    ]

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
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Our Programs</h1>
                        <p>Empowering athletes through comprehensive support</p>
                    </div>
                </section>

                {/* Programs Section */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.programsGrid}>
                            {programs.map((program, index) => (
                                <div key={index} className={styles.programCard}>
                                    <div className={styles.programImage}>
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className={styles.programContent}>
                                        <h3>{program.title}</h3>
                                        <p>{program.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
