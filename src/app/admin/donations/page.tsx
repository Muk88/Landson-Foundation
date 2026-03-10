'use client'

import React, { useEffect, useState } from 'react'
import { supabase, type Donation } from '@/lib/supabase'
import styles from './page.module.css'

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([])
    const [loading, setLoading] = useState(true)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        fetchDonations()
    }, [])

    async function fetchDonations() {
        try {
            const { data, error } = await supabase
                .from('donations')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setDonations(data || [])

            // Calculate total successful donations
            const total = data
                ?.filter((d) => d.payment_status === 'success')
                .reduce((sum, d) => sum + d.amount, 0) || 0
            setTotalAmount(total)
        } catch (error) {
            console.error('Error fetching donations:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Donations</h1>
                <p className={styles.subtitle}>Track all donation transactions</p>
            </div>

            <div className={styles.content}>
                <div className={styles.totalCard}>
                    <div className={styles.totalLabel}>
                        TOTAL DONATIONS (SUCCESSFUL)
                    </div>
                    <div className={styles.totalValue}>
                        KES {totalAmount.toLocaleString()}
                    </div>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : donations.length > 0 ? (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Donor</th>
                                    <th>Type</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                    <th>Status</th>
                                    <th>Reference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation.id}>
                                        <td data-label="Date">
                                            {new Date(donation.created_at).toLocaleDateString()}
                                        </td>
                                        <td data-label="Donor">
                                            <div style={{ fontWeight: 600 }}>{donation.donor_name || 'Anonymous'}</div>
                                            {donation.donor_email && (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)' }}>
                                                    {donation.donor_email}
                                                </div>
                                            )}
                                        </td>
                                        <td data-label="Type" style={{ textTransform: 'capitalize' }}>
                                            {donation.donation_type}
                                        </td>
                                        <td data-label="Amount" style={{ textAlign: 'right' }}>
                                            <span className={styles.amount}>KES {donation.amount.toLocaleString()}</span>
                                        </td>
                                        <td data-label="Status">
                                            <span className={`${styles.statusBadge} ${styles[donation.payment_status] || ''}`}>
                                                {donation.payment_status}
                                            </span>
                                        </td>
                                        <td data-label="Reference">
                                            <span className={styles.reference}>{donation.payment_reference}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>No donations yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}
