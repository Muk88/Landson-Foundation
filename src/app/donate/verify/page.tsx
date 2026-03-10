'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

export default function VerifyDonationPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
    const [message, setMessage] = useState('Verifying your payment...')

    useEffect(() => {
        const verifyPayment = async () => {
            const reference = searchParams.get('reference')

            if (!reference) {
                setStatus('error')
                setMessage('Invalid payment reference')
                return
            }

            try {
                const response = await fetch(`/api/donate/verify?reference=${reference}`)
                const data = await response.json()

                if (response.ok && data.success) {
                    setStatus('success')
                    setMessage('Thank you for your generous donation!')
                } else {
                    setStatus('error')
                    setMessage(data.error || 'Payment verification failed')
                }
            } catch (error) {
                setStatus('error')
                setMessage('Failed to verify payment. Please contact support.')
            }
        }

        verifyPayment()
    }, [searchParams])

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        {status === 'verifying' && (
                            <>
                                <div className={styles.spinner}></div>
                                <h1 className={styles.title}>Verifying Payment</h1>
                                <p className={styles.message}>{message}</p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <div className={styles.successIcon}>
                                    <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className={styles.title}>Payment Successful!</h1>
                                <p className={styles.message}>{message}</p>
                                <p className={styles.subMessage}>
                                    Your donation has been recorded and will help empower athletes through education.
                                </p>
                                <div className={styles.actions}>
                                    <Button onClick={() => router.push('/')} size="large">
                                        Return to Home
                                    </Button>
                                </div>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <div className={styles.errorIcon}>
                                    <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className={styles.title}>Payment Failed</h1>
                                <p className={styles.message}>{message}</p>
                                <div className={styles.actions}>
                                    <Button onClick={() => router.push('/donate')} size="large">
                                        Try Again
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
