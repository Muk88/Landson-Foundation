import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from './ui/Button'
import AnimateOnScroll from './ui/AnimateOnScroll'
import { GraduationCap, Activity, Handshake, Globe } from 'lucide-react'

export default function WelcomeSection() {
    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-16 md:gap-24">

                    {/* ── Our Story ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image side */}
                        <AnimateOnScroll variant="fade-right" duration="slow" className="order-2 lg:order-1 relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red-soft rounded-full -z-10 animate-pulse" />
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src="/images/story-side.jpg"
                                    alt="Our Story"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110 contrast-[1.05]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-brand-green p-8 rounded-2xl shadow-xl hidden md:block">
                                <p className="font-display font-black text-white text-4xl leading-none tracking-tight">100+</p>
                                <p className="font-display text-white/80 text-[10px] font-bold uppercase tracking-[0.25em] mt-2">Lives Impacted</p>
                            </div>
                        </AnimateOnScroll>

                        {/* Text side */}
                        <div className="order-1 lg:order-2 space-y-8">
                            <AnimateOnScroll variant="fade-up" delay={0}>
                                <div className="inline-block px-4 py-1.5 bg-brand-red-soft text-brand-red rounded-full">
                                    <span className="label-text text-brand-red">Who We Are</span>
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={80}>
                                <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
                                    Empowering <span className="text-brand-red">Kenya's</span> Future Champions
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={160}>
                                <p className="font-body text-body text-lg md:text-xl leading-relaxed">
                                    Founded in the heart of Kenya's legendary highlands, the Landson Foundation was born from a simple yet powerful belief: every talented athlete deserves the opportunity to pursue both their sporting dreams and academic excellence.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={220}>
                                <p className="font-body text-body text-lg leading-relaxed italic border-l-4 border-brand-green pl-6 text-muted">
                                    "We bridge the gap between athletic potential and educational opportunity, creating a legacy that transcends the track."
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={300}>
                                <div className="pt-4">
                                    <Link href="/about">
                                        <Button variant="primary" size="lg">Learn Our Full Story</Button>
                                    </Link>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    {/* ── Our Key Focus ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text side */}
                        <div className="space-y-8">
                            <AnimateOnScroll variant="fade-up" delay={0}>
                                <div className="inline-block px-4 py-1.5 bg-brand-green-soft rounded-full">
                                    <span className="label-text text-brand-green">What We Do</span>
                                </div>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={80}>
                                <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
                                    Excellence Through <span className="text-brand-green text-shadow-glow">Education</span>
                                </h2>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={160}>
                                <p className="font-body text-body text-lg md:text-xl leading-relaxed">
                                    We provide a holistic support system that includes scholarship programs, elite athletic training, and lifelong mentorship.
                                </p>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={220}>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {[
                                        { icon: <GraduationCap className="w-6 h-6 text-brand-green" />, label: 'Full Scholarships' },
                                        { icon: <Activity className="w-6 h-6 text-brand-green" />, label: 'Elite Training' },
                                        { icon: <Handshake className="w-6 h-6 text-brand-green" />, label: 'Mentorship' },
                                        { icon: <Globe className="w-6 h-6 text-brand-green" />, label: 'Global Exposure' }
                                    ].map((item) => (
                                        <li key={item.label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-white hover:border-brand-green hover:shadow-md">
                                            <div className="flex-shrink-0">{item.icon}</div>
                                            <span className="font-body font-bold text-ink">{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateOnScroll>
                            <AnimateOnScroll variant="fade-up" delay={300}>
                                <div className="pt-4">
                                    <Link href="/programs">
                                        <Button variant="secondary" size="lg">Explore Programs</Button>
                                    </Link>
                                </div>
                            </AnimateOnScroll>
                        </div>

                        {/* Image side */}
                        <AnimateOnScroll variant="fade-left" duration="slow">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-brand-green rotate-3 rounded-3xl transition-transform group-hover:rotate-0 duration-500" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-white">
                                    <Image
                                        src="/images/future.jpg"
                                        alt="Our Focus"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110 contrast-[1.1]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </section>
    )
}
