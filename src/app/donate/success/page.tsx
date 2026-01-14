import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

export const metadata = {
    title: 'Thank You | Landson Foundation',
    description: 'Thank you for your donation',
}

export default function DonationSuccessPage({
    searchParams,
}: {
    searchParams: { reference?: string }
}) {
    return (
        <>
            <Header />
            <main>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.icon}>
                            <svg width="60" height="60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className={styles.title}>Thank You for Your Generosity!</h1>

                        <p className={styles.message}>
                            Your donation has been successfully processed. You're making a real difference
                            in the lives of talented young athletes in Nandi. Together, we're building
                            champions both on and off the track.
                        </p>

                        {searchParams.reference && (
                            <div className={styles.reference}>
                                <p>Transaction Reference:</p>
                                <code>{searchParams.reference}</code>
                            </div>
                        )}

                        <div className={styles.buttons}>
                            <Link href="/">
                                <Button>Return Home</Button>
                            </Link>
                            <Link href="/stories">
                                <Button variant="outline">Read Success Stories</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
