'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import HeroSpacer from '@/components/ui/HeroSpacer'
import { Gem, Star, Rocket } from 'lucide-react'

// ─── YouTube Configuration ────────────────────────────────────────────────────
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@LandsonFoundation'
const YOUTUBE_FEATURED_VIDEO = 'https://www.youtube.com/embed/YDRpCPtXuFA'
// ──────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white"><main className="flex-grow pt-[72px] bg-white">
                <HeroSpacer />

                <section className="relative min-h-[60vh] lg:min-h-[60vh] py-16 lg:py-24 flex items-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/nandi-landscape.jpg"
                        alt="Nandi County Landscape"
                        fill
                        className="object-cover object-[center_30%] opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90" />
                    
                    {/* Left-aligned editorial layout with 8-10% left padding on large screens */}
                    <div className="relative z-10 w-full px-6 md:pl-12 lg:pl-[10%] lg:pr-12 max-w-[1400px] space-y-4 md:space-y-6 pt-4">
                        <div className="space-y-3">
                            {/* Eyebrow Label */}
                            <div className="flex items-center gap-4 animate-fade-in-up">
                                <div className="w-12 h-0.5 bg-brand-red"></div>
                                <span className="font-display font-bold text-brand-red text-sm md:text-base uppercase tracking-[0.25em]">
                                    About Landson
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display font-black text-white text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] tracking-tight drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
                                The <span className="text-brand-red">Landson</span> <br />
                                Legacy.
                            </h1>
                        </div>

                        {/* Layout: Paragraph on the left, Buttons on the right to save vertical space */}
                        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 lg:gap-10 pt-3 border-t border-white/20 max-w-5xl animate-fade-in-up [animation-delay:400ms]">
                            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg flex-1">
                                We believe every talented young person deserves the opportunity to learn, grow, compete, and lead. Through education, mentorship, and community support, we help unlock the next generation of Kenyan changemakers.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                                <Link href="/programs" className="group w-full sm:w-auto">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-brand-red/40 flex items-center justify-center">
                                        Explore Our Programs
                                    </Button>
                                </Link>
                                <Link href="#our-story" className="group w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-green flex items-center justify-center">
                                        Our Impact
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Our Story ── */}
                <section id="our-story" className="py-16 md:py-24 bg-white overflow-hidden">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                            {/* Text */}
                            <div className="space-y-8">
                                <AnimateOnScroll variant="fade-up" delay={0}>
                                    <div className="space-y-4">
                                        <h2 className="font-heading font-black text-ink text-4xl md:text-5xl leading-[1.08] tracking-[-0.02em]">
                                            Where <span className="text-brand-green">Champions</span> are Born
                                        </h2>
                                        <div className="w-20 h-1.5 bg-brand-red rounded-full" />
                                    </div>
                                </AnimateOnScroll>
                                <AnimateOnScroll variant="fade-up" delay={100}>
                                    <div className="prose prose-lg max-w-none space-y-6 font-body text-body leading-relaxed">
                                        <p>
                                            Located in Nandi County, Kenya - famously known as the "Source of Champions" - the Landson Foundation was established to address a critical challenge facing young athletic talent.
                                        </p>
                                        <p>
                                            While Nandi produces some of the world's most exceptional middle and long-distance runners, many of these young athletes face a difficult choice between pursuing their sporting dreams and completing their education. Poverty and lack of infrastructure often force them to abandon one for the other.
                                        </p>
                                        <p>
                                            We believe that no child should have to sacrifice their education for their talent. Our foundation provides the bridge, ensuring that academic excellence and athletic achievement go hand-in-hand.
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>

                            {/* Image */}
                            <AnimateOnScroll variant="fade-left" delay={150} duration="slow">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-brand-red/5 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-500" />
                                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5]">
                                        <Image
                                            src="/images/athletes 1.jpg"
                                            alt="Young Athletes"
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* ── YouTube Section ── */}
                <section className="relative bg-brand-green overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
                    </div>
                    <div className="container-custom relative z-10 py-16 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Text */}
                            <AnimateOnScroll variant="fade-right" delay={0} duration="slow">
                                <div className="space-y-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                        Watch on YouTube
                                    </span>
                                    <h2 className="font-heading font-black text-white text-3xl md:text-4xl leading-tight tracking-[-0.015em]">
                                        See the Mission <span className="text-brand-red underline decoration-white/20 underline-offset-8">in Action</span>
                                    </h2>
                                    <p className="font-body text-white/80 leading-relaxed text-base max-w-sm">
                                        Go behind the scenes of Landson Foundation — witness the training, the stories, and the lives we are changing in Nandi County.
                                    </p>
                                    <a
                                        href={YOUTUBE_CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                        Subscribe to Our Channel
                                    </a>
                                </div>
                            </AnimateOnScroll>

                            {/* Video */}
                            <AnimateOnScroll variant="fade-left" delay={150} duration="slow">
                                <div className="relative">
                                    <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 via-transparent to-brand-red/40 rounded-2xl" />
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                        <div className="aspect-video bg-black">
                                            <iframe
                                                src={YOUTUBE_FEATURED_VIDEO + '?rel=0&modestbranding=1'}
                                                title="Landson Foundation — Our Story"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </section>

                {/* ── Founder's Journey ── */}
                <section id="founder-journey" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                            {/* Founder image */}
                            <AnimateOnScroll variant="fade-right" delay={0} duration="slow" className="order-2 lg:order-1 relative">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border-8 border-white">
                                    <Image
                                        src="/images/founder.jpg"
                                        alt="Founder Alfred"
                                        fill
                                        className="object-cover object-top contrast-[1.1]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -right-10 bg-brand-green p-10 rounded-3xl shadow-2xl hidden md:block">
                                    <p className="text-white font-heading font-black text-2xl uppercase tracking-tighter">Founder's Vision</p>
                                </div>
                            </AnimateOnScroll>

                            {/* Text */}
                            <div className="order-1 lg:order-2 space-y-10">
                                <AnimateOnScroll variant="fade-up" delay={0}>
                                    <div className="space-y-4">
                                        <span className="font-display font-bold text-brand-red text-[11px] uppercase tracking-[0.22em]">The Heart of Landson</span>
                                        <h2 className="font-heading font-black text-ink text-4xl md:text-5xl leading-[1.08] tracking-[-0.02em]">
                                            Alfred's <span className="text-brand-red">Journey</span>
                                        </h2>
                                    </div>
                                </AnimateOnScroll>
                                <AnimateOnScroll variant="fade-up" delay={100}>
                                    <div className="font-body text-body text-lg leading-relaxed italic border-l-4 border-brand-red pl-8 text-muted space-y-4">
                                        <p>
                                            "Having grown up in Nandi, I saw firsthand the incredible potential that often went unrealized due to a lack of support. My journey wasn't just about my own success, but about how I could open doors for the next generation of athletes."
                                        </p>
                                        <p className="not-italic font-bold text-ink">— Alfred, Founder of Landson Foundation</p>
                                    </div>
                                </AnimateOnScroll>
                                <AnimateOnScroll variant="fade-up" delay={180}>
                                    <p className="font-body text-body text-lg leading-relaxed">
                                        Alfred's vision was to create more than just a training camp. He wanted a sanctuary of learning and excellence, where the discipline of the track translates into the diligence of the classroom.
                                    </p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Core Values ── */}
                <section id="core-values" className="py-16 md:py-24 bg-white">
                    <div className="container-custom text-center space-y-20">
                        <AnimateOnScroll variant="fade-up" delay={0}>
                            <div className="max-w-3xl mx-auto space-y-6">
                                <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl tracking-[-0.02em]">Our Core <span className="text-brand-green">Values</span></h2>
                                <p className="font-body text-muted text-xl leading-relaxed">These principles guide every decision we make and every program we run.</p>
                            </div>
                        </AnimateOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { title: 'Integrity', desc: 'We operate with complete transparency and honesty in all our dealings with athletes, donors, and the community.', icon: <Gem className="w-16 h-16 text-brand-green" strokeWidth={1.5} /> },
                                { title: 'Excellence', desc: 'We strive for the highest standards in both athletic training and educational support, settling for nothing less than the best.', icon: <Star className="w-16 h-16 text-brand-green" strokeWidth={1.5} /> },
                                { title: 'Empowerment', desc: "We don't just provide aid; we provide the tools and opportunities for young people to build their own successful futures.", icon: <Rocket className="w-16 h-16 text-brand-green" strokeWidth={1.5} /> }
                            ].map((value, i) => (
                                <AnimateOnScroll key={value.title} variant="scale-up" delay={i * 120} easing="spring" duration="slow">
                                    <div className="group p-12 bg-gray-50 rounded-[3rem] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-4 border border-transparent hover:border-brand-green/10">
                                        <div className="text-6xl mb-8 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 inline-block">{value.icon}</div>
                                        <h3 className="font-heading font-black text-ink text-3xl mb-4 group-hover:text-brand-green transition-colors tracking-tight">{value.title}</h3>
                                        <p className="font-body text-body text-lg leading-relaxed">{value.desc}</p>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ── */}
                <section className="py-16 bg-brand-red relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
                    </div>
                    <div className="container-custom relative z-10 text-center space-y-6">
                        <AnimateOnScroll variant="fade-up" delay={0}>
                            <h2 className="font-display font-black text-white text-3xl md:text-4xl leading-tight tracking-[-0.02em]">Ready to be part of the story?</h2>
                        </AnimateOnScroll>
                        <AnimateOnScroll variant="fade-up" delay={100}>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
                                <Link href="/contact">
                                    <Button variant="secondary" size="md" className="bg-white text-brand-red hover:bg-gray-100 px-8 text-lg">Work With Us</Button>
                                </Link>
                                <Link href="/programs">
                                    <Button variant="outline" size="md" className="border-white text-white hover:bg-white hover:text-brand-red px-8 text-lg">Explore Programs</Button>
                                </Link>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>
            </main></div>
    )
}
