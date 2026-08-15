'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase, type ImpactMetrics } from '@/lib/supabase'
import AnimateOnScroll from './ui/AnimateOnScroll'

export default function ImpactSection() {
    const [metrics, setMetrics] = useState<ImpactMetrics | null>(null)

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const { data, error } = await supabase
                    .from('impact_metrics')
                    .select('*')
                    .limit(1)
                if (error) throw error
                setMetrics(data && data.length > 0 ? data[0] : null)
            } catch (error) {
                console.error('Error fetching metrics:', error)
            }
        }
        fetchMetrics()
    }, [])

    const formattedMetrics = React.useMemo(() => ({
        athletesSupported: metrics?.athletes_supported?.toLocaleString() || '100+',
        schoolFeesPaid: metrics?.school_fees_paid?.toLocaleString() || '40+',
        medalsWon: metrics?.medals_won?.toLocaleString() || '15+',
    }), [metrics])

    const stats = [
        {
            label: 'Athletes Supported',
            value: formattedMetrics.athletesSupported,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            label: 'Scholarships',
            value: formattedMetrics.schoolFeesPaid,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            label: 'Medals Won',
            value: formattedMetrics.medalsWon,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
    ]

    return (
        <section className="relative py-16 md:py-24 bg-brand-green overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left — text + stats */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <AnimateOnScroll variant="fade-up" delay={0}>
                                <h2 className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em]">
                                    Transforming Lives Through{' '}
                                    <span className="text-brand-red underline decoration-white/20 underline-offset-8">Athletics</span>{' '}
                                    and Education
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={100}>
                                <p className="font-body text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
                                    We believe that every talented young athlete deserves the opportunity to pursue both their athletic dreams and academic excellence in Nandi County.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        {/* Stats — staggered */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {stats.map((item, i) => (
                                <AnimateOnScroll
                                    key={item.label}
                                    variant="scale-up"
                                    delay={i * 120}
                                    easing="spring"
                                    duration="slow"
                                >
                                    <div className="flex flex-col items-center sm:items-start space-y-2 group">
                                        <div className="p-3 bg-white/10 rounded-xl text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <span className="stat-number text-5xl lg:text-6xl text-white">{item.value}</span>
                                        <span className="label-text text-white/60">{item.label}</span>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>

                    {/* Right — image grid */}
                    <AnimateOnScroll variant="fade-left" duration="slow" delay={200}>
                        <div className="grid grid-cols-2 gap-4 h-[500px] sm:h-[600px]">
                            <div className="space-y-4 pt-12">
                                <div className="relative h-2/3 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image src="/images/nandi-region.jpg" alt="Impact" fill className="object-cover contrast-[1.1]" sizes="(max-width: 768px) 50vw, 25vw" />
                                </div>
                                <div className="relative h-1/3 rounded-2xl overflow-hidden shadow-2xl bg-brand-red p-8 flex items-end">
                                    <p className="font-heading font-bold text-white text-2xl leading-tight">Rooted in Excellence.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="relative h-1/3 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image src="/images/shoes.jpg" alt="Impact" fill className="object-cover contrast-[1.1]" sizes="(max-width: 768px) 50vw, 25vw" />
                                </div>
                                <div className="relative h-2/3 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image src="/images/training.jpg" alt="Impact" fill className="object-cover contrast-[1.1]" sizes="(max-width: 768px) 50vw, 25vw" />
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    )
}
