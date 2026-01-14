import React from 'react'
import Link from 'next/link'
import Button from './ui/Button'
import styles from './WelcomeSection.module.css'

export default function WelcomeSection() {
    return (
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeContainer}>
                {/* Our Story */}
                <div className={styles.storySection}>
                    <div className={styles.storyContent}>
                        <div className={styles.sectionLabel}>Who We Are</div>
                        <h2 className={styles.sectionTitle}>Our Story</h2>
                        <p className={styles.sectionDescription}>
                            Founded in the heart of Nandi County, Kenya - the legendary home of champions -
                            Landson Foundation was born from a simple belief: every talented athlete deserves
                            the opportunity to pursue both their sporting dreams and academic excellence.
                            We bridge the gap between athletic potential and educational opportunity.
                        </p>
                        <Link href="/about">
                            <Button variant="primary">Learn More About Us</Button>
                        </Link>
                    </div>
                    <div className={styles.storyImage}>
                        <img src="/images/story-side.jpg" alt="Our Story" />
                    </div>
                </div>

                {/* Our Key Focus */}
                <div className={styles.focusSection}>
                    <div className={styles.focusImage}>
                        <img src="/images/future.jpg" alt="Our Focus" />
                    </div>
                    <div className={styles.focusContent}>
                        <div className={styles.sectionLabel}>What We Do</div>
                        <h2 className={styles.sectionTitle}>Our Key Focus</h2>
                        <p className={styles.sectionDescription}>
                            We provide comprehensive support through scholarship programs, athletic training,
                            and mentorship. Our holistic approach ensures that young athletes receive quality
                            education while developing their sporting talents, creating well-rounded individuals
                            ready to excel in any field they choose.
                        </p>
                        <Link href="/programs">
                            <Button variant="secondary">Explore Our Programs</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
