'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export default function MetricsPage() {
    const [metrics, setMetrics] = useState({
        athletes_supported: 0,
        school_fees_paid: 0,
        medals_won: 0,
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const { data, error } = await supabase
                    .from('impact_metrics')
                    .select('*')
                    .single()

                if (error) throw error
                if (data) {
                    setMetrics({
                        athletes_supported: data.athletes_supported,
                        school_fees_paid: data.school_fees_paid,
                        medals_won: data.medals_won,
                    })
                }
            } catch (error) {
                console.error('Error fetching metrics:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMetrics()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMetrics({
            ...metrics,
            [e.target.name]: parseInt(e.target.value) || 0,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setSuccess(false)

        try {
            const { error } = await supabase
                .from('impact_metrics')
                .upsert([metrics])

            if (error) throw error
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (error) {
            console.error('Error saving metrics:', error)
            alert('Failed to save metrics')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="header">
                <h1>Impact Metrics</h1>
                <p>Update the live counters displayed on the homepage</p>
            </div>

            <div className="content">
                {success && (
                    <div style={{ background: 'var(--color-green-light)', color: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>
                        Metrics updated successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Athletes Supported</label>
                        <input
                            type="number"
                            name="athletes_supported"
                            value={metrics.athletes_supported}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{ padding: 'var(--spacing-sm)', fontSize: '1.5rem', fontWeight: 600 }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>School Fees Paid</label>
                        <input
                            type="number"
                            name="school_fees_paid"
                            value={metrics.school_fees_paid}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{ padding: 'var(--spacing-sm)', fontSize: '1.5rem', fontWeight: 600 }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Medals Won</label>
                        <input
                            type="number"
                            name="medals_won"
                            value={metrics.medals_won}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{ padding: 'var(--spacing-sm)', fontSize: '1.5rem', fontWeight: 600 }}
                        />
                    </div>

                    <Button type="submit" loading={saving} size="large">
                        Save Metrics
                    </Button>
                </form>
            </div>
        </>
    )
}
