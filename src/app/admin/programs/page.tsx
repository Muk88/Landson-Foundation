'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type Program } from '@/lib/supabase'
import styles from './page.module.css'

export default function ProgramsManagementPage() {
    const router = useRouter()
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

    useEffect(() => {
        fetchPrograms()
    }, [filter])

    async function fetchPrograms() {
        try {
            let query = supabase
                .from('programs')
                .select('*')
                .order('order_index', { ascending: true })

            if (filter === 'active') {
                query = query.eq('is_active', true)
            } else if (filter === 'inactive') {
                query = query.eq('is_active', false)
            }

            const { data, error } = await query

            if (error) throw error
            setPrograms(data || [])
        } catch (error) {
            console.error('Error fetching programs:', error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleActive(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('programs')
                .update({ is_active: !currentStatus })
                .eq('id', id)

            if (error) throw error
            fetchPrograms()
        } catch (error) {
            console.error('Error toggling active status:', error)
        }
    }

    async function deleteProgram(id: string) {
        if (!confirm('Are you sure you want to delete this program?')) return

        try {
            const { error } = await supabase
                .from('programs')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchPrograms()
        } catch (error) {
            console.error('Error deleting program:', error)
        }
    }

    async function moveProgram(id: string, direction: 'up' | 'down') {
        const currentIndex = programs.findIndex(p => p.id === id)
        if (currentIndex === -1) return

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
        if (targetIndex < 0 || targetIndex >= programs.length) return

        const currentProgram = programs[currentIndex]
        const targetProgram = programs[targetIndex]

        try {
            // Swap order_index values
            await supabase
                .from('programs')
                .update({ order_index: targetProgram.order_index })
                .eq('id', currentProgram.id)

            await supabase
                .from('programs')
                .update({ order_index: currentProgram.order_index })
                .eq('id', targetProgram.id)

            fetchPrograms()
        } catch (error) {
            console.error('Error reordering programs:', error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Programs</h1>
                    <p className={styles.subtitle}>Manage foundation programs</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'active' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === 'inactive' ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => setFilter('inactive')}
                        >
                            Inactive
                        </Button>
                    </div>
                    <Link href="/admin/programs/new">
                        <Button>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Program
                        </Button>
                    </Link>
                </div>
            </div>

            <div className={styles.content}>
                {loading ? (
                    <div>Loading...</div>
                ) : programs.length > 0 ? (
                    <div className={styles.programsList}>
                        {programs.map((program, index) => (
                            <div key={program.id} className={styles.programCard}>
                                <div className={styles.orderControls}>
                                    <button
                                        onClick={() => moveProgram(program.id, 'up')}
                                        disabled={index === 0}
                                        className={styles.orderButton}
                                        title="Move up"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <span className={styles.orderIndex}>#{program.order_index}</span>
                                    <button
                                        onClick={() => moveProgram(program.id, 'down')}
                                        disabled={index === programs.length - 1}
                                        className={styles.orderButton}
                                        title="Move down"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={styles.programContent}>
                                    {program.image_url && (
                                        <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={program.image_url}
                                                alt={program.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div className={styles.programHeader}>
                                        <h3 className={styles.programTitle}>
                                            {program.icon && <span className={styles.icon}>{program.icon}</span>}
                                            {program.title}
                                        </h3>
                                        <span className={`${styles.statusBadge} ${program.is_active ? styles.active : styles.inactive}`}>
                                            {program.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className={styles.description}>{program.description}</p>
                                </div>

                                <div className={styles.actions}>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => toggleActive(program.id, program.is_active)}
                                        title={program.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {program.is_active ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            )}
                                        </svg>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => router.push(`/admin/programs/${program.id}/edit`)}
                                        title="Edit"
                                        style={{ color: '#2563eb', borderColor: '#2563eb' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => deleteProgram(program.id)}
                                        title="Delete"
                                        style={{ color: '#ef4444', borderColor: '#ef4444' }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>{filter === 'all' ? 'No programs yet.' : `No ${filter} programs found.`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
