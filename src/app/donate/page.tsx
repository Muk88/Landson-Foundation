'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

type DonationType = 'shoes' | 'books' | 'scholarship' | null

export default function DonatePage() {
    const [selectedType, setSelectedType] = useState<DonationType>(null)
    const [formData, setFormData] = useState({
        amount: '',
        name: '',
        email: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const impactOptions = [
        {
            type: 'shoes' as DonationType,
            icon: (
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Running Shoes',
            description: 'Provide quality running shoes to help athletes train safely and effectively',
        },
        {
            type: 'books' as DonationType,
            icon: (
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'School Books',
            description: 'Supply essential textbooks and learning materials for academic success',
        },
        {
            type: 'scholarship' as DonationType,
            icon: (
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ),
            title: 'Full Year Scholarship',
            description: 'Cover a full year of school fees, uniforms, and educational expenses',
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!selectedType) {
            setError('Please select a donation type')
            setLoading(false)
            return
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('Please enter a valid amount')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    email: formData.email,
                    name: formData.name,
                    donationType: selectedType,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to initialize payment')
            }

            // Redirect to Paystack payment page
            window.location.href = data.authorizationUrl
        } catch (err: any) {
            setError(err.message || 'Failed to process donation. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Image
                        src="/images/donate-hero.jpg"
                        alt="Support Our Athletes"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Make a Difference</h1>
                        <p className={styles.heroSubtitle}>
                            Your contribution helps talented athletes achieve their dreams through education
                        </p>
                    </div>
                </section>

                {/* Impact Visualizer */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.impactTitle}>Choose Your Impact</h2>
                        <div className={styles.impactGrid}>
                            {impactOptions.map((option) => (
                                <div
                                    key={option.type}
                                    className={`${styles.impactCard} ${selectedType === option.type ? styles.selected : ''
                                        }`}
                                    onClick={() => setSelectedType(option.type)}
                                >
                                    <div className={styles.impactIcon}>{option.icon}</div>
                                    <h3>{option.title}</h3>
                                    <p>{option.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Donation Form */}
                        <div className={styles.donationForm}>
                            <h2 className={styles.formTitle}>Complete Your Donation</h2>

                            {error && <div className={styles.errorMessage}>{error}</div>}

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="amount">Donation Amount (KES) *</label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        placeholder="Enter amount"
                                        className={styles.amountInput}
                                        required
                                        min="1"
                                        step="1"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name (Optional)</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>

                                <div className={styles.submitButton}>
                                    <Button type="submit" fullWidth loading={loading} size="large">
                                        Proceed to Payment
                                    </Button>
                                </div>

                                <p className={styles.infoText}>
                                    You will be redirected to Paystack to complete your secure payment
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
