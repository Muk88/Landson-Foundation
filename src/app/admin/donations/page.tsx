'use client'

import React, { useEffect, useState } from 'react'
import { supabase, type Donation } from '@/lib/supabase'

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
        <>
            <div className="header">
                <h1>Donations</h1>
                <p>Track all donation transactions</p>
            </div>

            <div className="content">
                <div style={{ background: 'linear-gradient(135deg, var(--color-green), var(--color-green-dark))', color: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                        TOTAL DONATIONS (SUCCESSFUL)
                    </div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                        KES {totalAmount.toLocaleString()}
                    </div>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : donations.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-300)' }}>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-red)' }}>Date</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-red)' }}>Donor</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-red)' }}>Type</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', color: 'var(--color-red)' }}>Amount</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-red)' }}>Status</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-red)' }}>Reference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <tr key={donation.id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            {new Date(donation.created_at).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            {donation.donor_name || 'Anonymous'}
                                            {donation.donor_email && (
                                                <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                                                    {donation.donor_email}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textTransform: 'capitalize' }}>
                                            {donation.donation_type}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontWeight: 600 }}>
                                            KES {donation.amount.toLocaleString()}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '0.875rem',
                                                    background:
                                                        donation.payment_status === 'success'
                                                            ? 'var(--color-green)'
                                                            : donation.payment_status === 'pending'
                                                                ? 'var(--color-gray-500)'
                                                                : 'var(--color-red)',
                                                    color: 'white',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {donation.payment_status}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--color-gray-600)' }}>
                                            {donation.payment_reference}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-gray-500)' }}>
                        <p>No donations yet</p>
                    </div>
                )}
            </div>
        </>
    )
}
