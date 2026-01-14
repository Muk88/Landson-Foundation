import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata = {
    title: 'About Us | Landson Foundation',
    description: 'Learn about our mission to empower athletes through education in Nandi, Kenya',
}

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Image
                        src="/images/nandi-landscape.jpg"
                        alt="Nandi landscape"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Our Story</h1>
                        <p>Empowering Nandi's athletes through education and opportunity</p>
                    </div>
                </section>

                {/* 1. Who We Are */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.whoWeAreSection}>
                            <div className={styles.whoWeAreText}>
                                <h2>Who We Are</h2>
                                <p>
                                    Landson Foundation is a nonprofit organization headquartered in Mosoriot, Nandi County, Kenya.
                                    Founded by Kenyan-Australian scholar and social scientist Alfred Koech Sergent, we operate at
                                    the intersection of athletic talent development and educational empowerment.
                                </p>
                                <p>
                                    We function as a sophisticated mechanism for converting the region's abundant "physiological
                                    capital"—its world-renowned distance running talent—into durable "intellectual capital" through
                                    the facilitation of international scholarships and the provision of critical training infrastructure.
                                </p>
                                <p>
                                    Our operational model is built on the belief that every talented athlete deserves the opportunity
                                    to pursue both their sporting dreams and academic excellence. We bridge the gap between athletic
                                    potential and educational opportunity, providing comprehensive support through scholarships,
                                    mentorship, and training programs.
                                </p>
                            </div>
                            <div className={styles.whoWeAreImage}>
                                <Image
                                    src="/images/education.jpg"
                                    alt="Who We Are"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. The Source of Champions */}
                <section className={`${styles.section} ${styles.contextSection}`}>
                    <div className={styles.container}>
                        <div className={styles.contextGrid}>
                            <div className={styles.contextImage}>
                                <Image
                                    src="/images/runner.jpg"
                                    alt="Nandi athletes - Source of Champions"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.contextText}>
                                <h2>The Source of Champions</h2>
                                <p>
                                    Nandi County in Kenya's Rift Valley is known as the "Source of Champions." This small region
                                    has produced more world-class distance runners than any other place on Earth. The combination
                                    of high altitude, cultural heritage that values endurance, and a socio-economic environment
                                    where running is seen as a viable path creates a fiercely competitive environment.
                                </p>
                                <p>
                                    However, for every athlete who secures a professional contract, thousands are left behind with
                                    limited education and few economic prospects. Landson Foundation addresses this "athlete's trap"
                                    by reintroducing education into a culture that often sacrifices schooling for training camps,
                                    ensuring that talented runners who may not become the next Eliud Kipchoge can still become
                                    successful professionals through the educational pathway.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Mission & Vision */}
                <section className={`${styles.section} ${styles.missionSection}`}>
                    <div className={styles.container}>
                        <div className={styles.missionHeader}>
                            <h2>Our Mission & Vision</h2>
                            <p>Our commitment to empowering Nandi's athletes through education</p>
                        </div>
                        <div className={styles.missionGrid}>
                            <div className={styles.missionCard}>
                                <div className={styles.missionIcon}>
                                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3>Identify & Nurture</h3>
                                <p>
                                    To identify young athletes with exceptional potential and nurture their talents through
                                    comprehensive support systems that balance athletics and academics.
                                </p>
                            </div>

                            <div className={styles.missionCard}>
                                <div className={styles.missionIcon}>
                                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <h3>Educate & Empower</h3>
                                <p>
                                    To provide access to quality education through scholarships and resources, ensuring no
                                    talented athlete has to choose between their passion and their future.
                                </p>
                            </div>

                            <div className={styles.missionCard}>
                                <div className={styles.missionIcon}>
                                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3>Transform & Inspire</h3>
                                <p>
                                    To transform lives by creating pathways to success both on and off the track, inspiring
                                    future generations to pursue excellence in all areas of life.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Founder's Journey */}
                <section className={`${styles.section} ${styles.founderSectionWrapper}`}>
                    <div className={styles.container}>
                        <div className={styles.founderSection}>
                            <div className={styles.founderText}>
                                <h2>The Founder's Journey</h2>
                                <p>
                                    Alfred Koech Sergent grew up in the hills of Nandi County, pursuing professional athletics
                                    like many young men in the region. When his athletic career didn't lead to lucrative podium
                                    finishes on the European circuit, he made a crucial pivot: using athletics as a means rather
                                    than an end.
                                </p>
                                <p>
                                    Koech leveraged his athletic background to secure opportunities for further studies in Australia,
                                    eventually becoming a social scientist and scholar based in Perth, Western Australia. This
                                    transition—from "athletics for income" to "athletics for education"—became the core philosophy
                                    of the Landson Foundation.
                                </p>
                                <p>
                                    In 2018, Alfred founded the Landson Foundation to institutionalize this "Plan B," ensuring that
                                    talented runners can become successful professionals through the educational pathway. As a
                                    diaspora philanthropist, he bridges the resource-rich Australian sports sector with the
                                    talent-rich but resource-poor Nandi ecosystem.
                                </p>
                            </div>
                            <div className={styles.founderImage}>
                                <Image
                                    src="/images/Alfred.jpg"
                                    alt="Alfred Koech Sergent, Founder"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Core Values */}
                <section className={`${styles.section} ${styles.valuesSection}`}>
                    <div className={styles.container}>
                        <div className={styles.missionHeader}>
                            <h2 style={{ color: 'var(--color-green)' }}>Our Core Values</h2>
                            <p style={{ color: 'var(--color-green)' }}>The principles that guide our work in Mosoriot and beyond</p>
                        </div>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard}>
                                <h4>Excellence</h4>
                                <p>We strive for the highest standards in everything we do, from athlete development to educational support</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Integrity</h4>
                                <p>We operate with transparency, honesty, and accountability in all our programs and partnerships</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Empowerment</h4>
                                <p>We believe in empowering athletes to take control of their futures through education and opportunity</p>
                            </div>
                            <div className={styles.valueCard}>
                                <h4>Community</h4>
                                <p>We are deeply rooted in Nandi County, working hand-in-hand with local communities to create lasting change</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
