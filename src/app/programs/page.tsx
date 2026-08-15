'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Button from '@/components/ui/Button'
import { Icon } from '@/lib/icons'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import HeroSpacer from '@/components/ui/HeroSpacer'
import { useEffect, useState } from 'react'

const timelineSteps = [
    {
        title: 'Scouting & Identification',
        description: 'We identify talented young athletes in Nandi through school competitions, community events, and recommendations from coaches and teachers.',
    },
    {
        title: 'Assessment & Selection',
        description: 'Selected athletes undergo evaluation of both athletic potential and academic performance to ensure they can benefit from our comprehensive support.',
    },
    {
        title: 'Training & Education',
        description: 'Athletes receive scholarships for their education while participating in structured training programs and mentorship sessions.',
    },
    {
        title: 'University & Professional Career',
        description: 'We support athletes through university education and help them transition to professional athletic careers or other fields of their choice.',
    },
]

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<any[]>([])

    useEffect(() => {
        async function fetchPrograms() {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            )
            const { data, error } = await supabase
                .from('programs')
                .select('*')
                .eq('is_active', true)
                .order('order_index', { ascending: true })

            if (!error && data) {
                setPrograms(data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    image: item.image_url,
                    slug: item.slug,
                    icon_name: item.icon_name || item.icon
                })))
            }
        }
        fetchPrograms()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-white"><main className="flex-grow pt-[72px] bg-white">
                <HeroSpacer />

                <section className="relative min-h-[60vh] lg:min-h-[60vh] py-16 lg:py-24 flex items-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/programs-hero.jpg"
                        alt="Our Programs"
                        fill
                        className="object-cover opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>

                    {/* Floating athlete decoration */}
                    <div className="absolute bottom-0 right-0 z-20 pointer-events-none hidden lg:block h-[80%] opacity-80 translate-x-20">
                        <Image
                            src="/images/athletes_1.png"
                            alt="Landson Athlete"
                            width={500}
                            height={700}
                            className="object-contain object-bottom contrast-[1.1]"
                        />
                    </div>

                    {/* Left-aligned editorial layout with 8-10% left padding on large screens */}
                    <div className="relative z-30 w-full px-6 md:pl-12 lg:pl-[10%] lg:pr-12 max-w-[1400px] space-y-4 md:space-y-6 pt-4">
                        <div className="space-y-3">
                            {/* Eyebrow Label */}
                            <div className="flex items-center gap-4 animate-fade-in-up">
                                <div className="w-12 h-0.5 bg-brand-red"></div>
                                <span className="font-display font-bold text-brand-red text-sm md:text-base uppercase tracking-[0.25em]">
                                    Our Programs
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display font-black text-white text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] tracking-tight drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
                                Where Talent <br />
                                Meets <span className="text-brand-red">Opportunity.</span>
                            </h1>
                        </div>

                        {/* Layout: Paragraph on the left, Buttons on the right to save vertical space */}
                        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 lg:gap-10 pt-3 border-t border-white/20 max-w-5xl animate-fade-in-up [animation-delay:400ms]">
                            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg flex-1">
                                Through scholarships, mentorship, academic support, and athletic excellence, we equip young people with the skills, confidence, and opportunities to succeed both in the classroom and beyond.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                                <a href="#development-model" className="group w-full sm:w-auto">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-brand-red/40 flex items-center justify-center gap-2 group-hover:-translate-y-1 transition-transform">
                                        Explore Development Model
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </Button>
                                </a>
                                <Link href="/stories" className="group w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-green group-hover:-translate-y-1 transition-transform">
                                        Success Stories
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Programs Grid ── */}
                <section className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <AnimateOnScroll variant="fade-up" delay={0} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <span className="inline-block px-4 py-1.5 bg-brand-green-soft rounded-full">
                                <span className="label-text text-brand-green">What We Offer</span>
                            </span>
                            <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl tracking-[-0.02em]">
                                Programs Built for <span className="text-brand-green">Champions</span>
                            </h2>
                        </AnimateOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {programs.map((program: any, index: number) => (
                                <AnimateOnScroll
                                    key={program.id}
                                    variant="fade-up"
                                    delay={index * 120}
                                    duration="slow"
                                    easing="elegant"
                                >
                                    <div className="group flex flex-col space-y-8">
                                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                                            <Image
                                                src={program.image}
                                                alt={program.title}
                                                fill
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            {program.icon_name && (
                                                <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-red shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                                    <Icon name={program.icon_name} size={32} />
                                                </div>
                                            )}

                                            <div className="absolute bottom-8 left-8 right-8">
                                                <h3 className="font-heading font-black text-white text-3xl leading-tight mb-2">{program.title}</h3>
                                                <div className="w-12 h-1 bg-brand-red rounded-full transform origin-left transition-all duration-500 group-hover:w-full" />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <p className="font-body text-body text-lg leading-relaxed line-clamp-3">
                                                {program.description}
                                            </p>
                                            <Link
                                                href={`/programs/${program.slug || '#'}`}
                                                className="inline-flex items-center gap-3 text-brand-green font-display font-bold text-[11px] uppercase tracking-[0.2em] hover:gap-5 transition-all"
                                            >
                                                {program.slug ? 'Explore Program' : 'Coming Soon'}
                                                {program.slug && (
                                                    <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Development Model / Timeline ── */}
                <section className="py-16 md:py-24 bg-gray-950 text-white overflow-hidden relative">
                    {/* Background image — clearly visible */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Image src="/images/runner2.jpg" alt="Runner" fill className="object-cover opacity-30 contrast-[1.1]" sizes="100vw" />
                    </div>
                    {/* Subtle dark overlay only — NO green */}
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="container-custom relative z-10">
                        {/* Header */}
                        <AnimateOnScroll variant="fade-up" delay={0} className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                            <span className="font-display font-bold text-brand-red text-[11px] uppercase tracking-[0.3em]">Development Model</span>
                            <h2 className="font-heading font-extrabold text-white text-4xl md:text-6xl leading-tight tracking-[-0.02em]">
                                The Journey to{' '}
                                <span className="underline decoration-brand-red decoration-8 underline-offset-[12px]">Success</span>
                            </h2>
                        </AnimateOnScroll>

                        {/* Timeline steps */}
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block" />

                            <div className="space-y-12 lg:space-y-0">
                                {timelineSteps.map((step, index) => (
                                    <AnimateOnScroll
                                        key={index}
                                        variant={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                        delay={index * 80}
                                        duration="slow"
                                        easing="elegant"
                                    >
                                        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                                            <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20'}`}>
                                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-500 shadow-2xl">
                                                    <span className="text-brand-red font-display font-black text-5xl opacity-30 mb-4 block leading-none">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <h4 className="font-heading font-black text-white text-2xl mb-4 uppercase tracking-tighter">{step.title}</h4>
                                                    <p className="font-body text-white/70 text-lg leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>
                                            {/* Centre dot */}
                                            <div className="relative z-20 flex items-center justify-center w-12 h-12 rounded-full bg-brand-red shadow-[0_0_30px_rgba(227,30,36,0.5)] border-4 border-gray-950 flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                                            </div>
                                            <div className="lg:w-1/2" />
                                        </div>
                                    </AnimateOnScroll>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Partner CTA ── */}
                <section className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <AnimateOnScroll variant="scale-up" delay={0} duration="slow" easing="elegant">
                            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center gap-12 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="flex-1 space-y-6 relative z-10 text-center lg:text-left">
                                    <AnimateOnScroll variant="fade-up" delay={100}>
                                        <h2 className="font-heading font-black text-ink text-3xl md:text-4xl leading-tight tracking-[-0.02em]">
                                            Partner with our <span className="text-brand-green">mission</span>
                                        </h2>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll variant="fade-up" delay={180}>
                                        <p className="font-body text-body text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                            We are always looking for organizations and individuals who share our vision for youth empowerment through sports and education.
                                        </p>
                                    </AnimateOnScroll>
                                    <AnimateOnScroll variant="fade-up" delay={260}>
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                            <Link href="/contact">
                                                <Button variant="primary" size="md" className="px-8 text-lg">Get in Touch</Button>
                                            </Link>
                                            <Link href="/about">
                                                <Button variant="outline" size="md" className="px-8 text-lg">Learn More</Button>
                                            </Link>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                                <AnimateOnScroll variant="fade-left" delay={200} className="flex-1 w-full relative">
                                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[16/10]">
                                        <Image src="/images/mentorship.jpg" alt="Partner" fill className="object-cover" />
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>
            </main></div>
    )
}
