import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CoreValuesCarousel from '@/components/about/CoreValuesCarousel'
import MissionVisionCarousel from '@/components/about/MissionVisionCarousel'
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
                        <p>Empowering Kenya's athletes through education and opportunity</p>
                    </div>
                </section>

                {/* 1. Who We Are */}
                <section id="our-story" className={styles.section}>
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
                        <div className={styles.whoWeAreImageWrap}>
                            <div className={styles.whoWeAreImageGradient} />
                            <Image
                                src="/images/athlete_2.png"
                                alt="Landson Foundation Athlete"
                                width={400}
                                height={560}
                                className={styles.whoWeAreAthleteImg}
                                style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. The Source of Champions */}
                <section className={`${styles.section} ${styles.contextSection}`}>
                    <div className={styles.sourceGrid}>
                        <div className={styles.sourceImage}>
                            <Image
                                src="/images/runner.jpg"
                                alt="Nandi athletes - Source of Champions"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.sourceText}>
                            <h2><span>The Source of Champions</span></h2>
                            <p>
                                Nandi County in Kenya's Rift Valley is known as the "Source of Champions." This small region
                                has produced more world-class distance runners than any other place on Earth. The combination
                                of high altitude, cultural heritage that values endurance, and a socio-economic environment
                                where running is seen as a viable path creates a fiercely competitive environment.
                            </p>
                            <p>
                                However, for every athlete who secures a professional contract, thousands are left behind with
                                limited education and few economic prospects. Landson Foundation addresses this athlete's trap
                                by integrating education into athletic development, creating well-rounded champions who excel in
                                both arenas. Just like Eliud Kipchoge—who is not only a world-class runner but also highly educated
                                and articulate—our athletes are empowered to achieve excellence on the track and in the classroom,
                                ensuring lifelong success and professional opportunities in all fields.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Athlete Banner */}
                <section className={styles.athleteBanner}>
                    <Image
                        src="/images/athletes 1.jpg"
                        alt="Nandi athletes"
                        fill
                        className={styles.athleteBannerImg}
                    />
                    <div className={styles.athleteBannerOverlay} />
                    <div className={styles.athleteBannerContent}>
                        <p className={styles.athleteBannerQuote}>
                            "Nandi is a land of champions.<br />We build their future."
                        </p>
                        <span className={styles.athleteBannerSub}>Landson Foundation — Est. 2018</span>
                    </div>
                </section>

                {/* 3. Mission & Vision Carousel */}
                <MissionVisionCarousel />

                {/* 4. Founder's Journey */}
                <section id="founder-journey" className={`${styles.section} ${styles.founderSectionWrapper}`}>
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
                                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Video Section - Watch Our Story */}
                <section className={styles.videoSection}>
                    <div className={styles.container}>
                        <div className={styles.missionHeader}>
                            <h2>Watch Our Story</h2>
                            <p>See how we're transforming lives in Nandi County</p>
                        </div>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/YDRpCPtXuFA"
                                title="Landson Foundation Story"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles.iframe}
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* 5. Core Values Carousel */}
                <CoreValuesCarousel />
            </main>
            <Footer />
        </>
    )
}
