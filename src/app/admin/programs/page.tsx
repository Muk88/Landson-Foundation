'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase, type Program } from '@/lib/supabase'
import { getAdminPath } from '@/lib/admin-path'
import styles from './page.module.css'

export default function ProgramsManagementPage() {
    const router = useRouter()
    const adminPath = getAdminPath()
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
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900 tracking-tight">Programs</h1>
                    <p className="text-gray-500 mt-1">Manage foundation programs</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'active' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === 'inactive' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('inactive')}
                        >
                            Inactive
                        </Button>
                    </div>
                    <Link href={`${adminPath}/programs/new`}>
                        <Button className="bg-brand-green hover:bg-green-700 text-white shadow-lg shadow-brand-green/20 rounded-full font-bold px-6">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Program
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="spinner"></div>
                    </div>
                ) : programs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program, index) => (
                            <div key={program.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col p-5 group">
                                <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg justify-center">
                                    <button
                                        onClick={() => moveProgram(program.id, 'up')}
                                        disabled={index === 0}
                                        className={`p-1.5 rounded transition-colors ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                                        title="Move up"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <span className="font-mono text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded shadow-sm">#{program.order_index}</span>
                                    <button
                                        onClick={() => moveProgram(program.id, 'down')}
                                        disabled={index === programs.length - 1}
                                        className={`p-1.5 rounded transition-colors ${index === programs.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                                        title="Move down"
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex-1">
                                    {program.image_url && (
                                        <div className="w-full h-40 overflow-hidden rounded-xl mb-4 relative">
                                            <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={program.image_url}
                                                alt={program.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h3 className="font-heading font-bold text-xl text-gray-900 leading-tight flex items-center gap-2">
                                            {program.icon && <span className="text-brand-green text-2xl">{program.icon}</span>}
                                            {program.title}
                                        </h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0 ${program.is_active ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-500'}`}>
                                            {program.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{program.description}</p>
                                </div>

                                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => toggleActive(program.id, program.is_active)}
                                        title={program.is_active ? 'Deactivate' : 'Activate'}
                                        className={`p-2 rounded-full transition-colors ${program.is_active ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {program.is_active ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            )}
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => router.push(`${adminPath}/programs/${program.id}/edit`)}
                                        title="Edit"
                                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ml-auto"
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteProgram(program.id)}
                                        title="Delete"
                                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No programs found</h3>
                        <p className="text-gray-500">{filter === 'all' ? 'Create your first program.' : `No ${filter} programs found.`}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
