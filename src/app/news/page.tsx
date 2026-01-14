import React from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata = {
    title: 'News & Updates | Landson Foundation',
    description: 'Latest news, updates, and achievements from the Landson Foundation',
}

export default function NewsPage() {
    const newsItems = [
        {
            id: 1,
            title: 'Founder Meets Australian High Commissioner in Kenya',
            date: 'January 2026',
            category: 'Partnership',
            image: '/images/education.jpg',
            excerpt: 'Alfred Koech Sergent, founder of Landson Foundation, met with the Australian High Commissioner to Kenya to discuss expanding educational opportunities for talented athletes in Nandi County.',
            content: `In a significant milestone for the Landson Foundation, founder Alfred Koech Sergent held a productive meeting with the Australian High Commissioner to Kenya. The discussion centered on strengthening the partnership between Australian educational institutions and talented young athletes from Nandi County.

The meeting explored opportunities for scholarship programs, athletic training partnerships, and educational exchange initiatives that align with the foundation's mission of using athletics as a pathway to education.

This diplomatic engagement represents a major step forward in creating sustainable pathways for Kenyan athletes to access world-class education while pursuing their athletic dreams.`
        },
        {
            id: 2,
            title: 'Dream Realized: Foundation Facility Construction Complete',
            date: 'December 2025',
            category: 'Infrastructure',
            image: '/images/future.jpg',
            excerpt: 'After years of planning and dedication, the Landson Foundation training and education facility in Mosoriot is now complete, providing a dedicated space for athletes to train and study.',
            content: `A dream that began years ago has finally become reality. The Landson Foundation is proud to announce the completion of our state-of-the-art training and education facility in Mosoriot, Nandi County.

This facility represents more than just infrastructure—it's a physical manifestation of our commitment to nurturing both athletic talent and academic excellence. The facility includes:

• Modern training grounds for athletics
• Dedicated study and tutoring spaces
• Library and resource center
• Meeting rooms for mentorship programs
• Administrative offices

The facility will serve as the central hub for our scholarship recipients, providing them with a professional environment to develop their talents while maintaining focus on their education. This achievement would not have been possible without the support of our partners, donors, and the local community.`
        },
        {
            id: 3,
            title: '150+ Athletes Receive Training Equipment',
            date: 'November 2025',
            category: 'Impact',
            image: '/images/training.jpg',
            excerpt: 'Through partnerships with Team Landson Perth and The Running Center Australia, we distributed running shoes and training gear to primary and secondary school students.',
            content: `In partnership with Team Landson Perth and The Running Center in Australia, the Landson Foundation successfully distributed 150 pairs of running shoes and comprehensive training gear to talented young athletes in Mosoriot.

This initiative removes one of the most significant barriers to athletic participation—access to proper equipment. Many talented runners in Nandi County train barefoot or in inadequate footwear, limiting their potential and increasing injury risk.

The distribution event brought together students from multiple schools, creating a sense of community and shared purpose. Each recipient also received guidance on proper training techniques and the importance of balancing athletics with education.

This program demonstrates the power of diaspora philanthropy and international partnerships in creating tangible impact for young athletes.`
        },
        {
            id: 4,
            title: 'Three Athletes Secure US University Scholarships',
            date: 'October 2025',
            category: 'Success',
            image: '/images/runner.jpg',
            excerpt: 'Nimrod Korir, Dismas Kipchumba, and Vivian Chepkemei have secured full athletic scholarships to US universities, marking a major milestone for the foundation.',
            content: `The Landson Foundation is thrilled to announce that three of our supported athletes—Nimrod Korir, Dismas Kipchumba, and Vivian Chepkemei—have secured full athletic scholarships to universities in the United States.

These scholarships represent the culmination of years of dedication, training, and academic preparation. Each athlete will have the opportunity to compete at the NCAA Division I level while pursuing their academic goals.

This achievement validates our core philosophy: athletics as a means to education, not just an end in itself. These young people are now positioned to become not just successful athletes, but educated professionals who can give back to their communities.

Their success stories serve as inspiration for the next generation of athletes in Nandi County, proving that with the right support, talent combined with education can open doors to extraordinary opportunities.`
        }
    ]

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
                        <div className={styles.newsGrid}>
                            {newsItems.map((item, index) => (
                                <article key={item.id} className={styles.newsCard} style={{ animationDelay: `${index * 0.1}s` }}>
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
                                        <div className={styles.newsBody}>
                                            {item.content.split('\n\n').map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
