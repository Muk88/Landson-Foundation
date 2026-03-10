'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import styles from './page.module.css'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // Contact Info State
    const [contactInfo, setContactInfo] = useState({
        email: 'info@landsonfoundation.org',
        phone: '+254 706 247 847',
        address: 'Nandi County, Kenya'
    })

    // Fetch contact info on mount
    React.useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch('/api/contact')
                if (response.ok) {
                    const data = await response.json()
                    if (data) {
                        setContactInfo({
                            email: data.email || 'info@landsonfoundation.org',
                            phone: data.phone || '+254 706 247 847',
                            address: data.address || 'Nandi County, Kenya'
                        })
                    }
                }
            } catch (err) {
                console.error('Failed to fetch contact info:', err)
                // Keep using fallback values on error
            }
        }

        fetchContactInfo()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setSuccess(true)
            setFormData({ name: '', email: '', message: '' })
        } catch (err) {
            setError('Failed to send message. Please try again.')
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
                        src="/images/contact-hero.jpg"
                        alt="Contact Us"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Get In Touch</h1>
                        <p>We'd love to hear from you</p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.contentGrid}>
                            {/* Contact Information */}
                            <div className={styles.contactInfo}>
                                <h2>Contact Information</h2>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h3>Email</h3>
                                        <p>
                                            <a href={`mailto:${contactInfo.email}`}>
                                                {contactInfo.email}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h3>Phone</h3>
                                        <p>{contactInfo.phone}</p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>
                                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h3>Location</h3>
                                        <p>{contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className={styles.formContainer}>
                                <h2>Send Us a Message</h2>

                                {success && (
                                    <div className={styles.successMessage}>
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {error && (
                                    <div className={styles.errorMessage}>{error}</div>
                                )}

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
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
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className={styles.submitButton}>
                                        <Button type="submit" fullWidth loading={loading}>
                                            Send Message
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className={`${styles.section} ${styles.mapSection}`}>
                    <div className={styles.container}>
                        <h2 className={styles.mapTitle}>Find Us in Nandi County</h2>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036!2d35.1!3d0.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1780d0e0d0d0d0d0%3A0x0!2sNandi%20County!5e0!3m2!1sen!2ske!4v1234567890"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
