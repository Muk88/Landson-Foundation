import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import HeroSpacer from '@/components/ui/HeroSpacer'


function HeroBackground() {
    return (
        <>
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-[1.1] saturate-[1.1]"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/home.jpg"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/20 to-brand-green/90 z-10"></div>
        </>
    )
}

function HeroContent() {
    return (
        <>
            {/* Floating Hero Athlete */}
            <div className="absolute bottom-0 right-0 z-20 pointer-events-none hidden lg:flex items-end h-[95%] pr-8 xl:pr-16">
                <Image
                    src="/images/kipchoge-cutout.png"
                    alt="Kenyan Champion Athlete"
                    width={480}
                    height={720}
                    className="object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-in-up [animation-delay:800ms] transition-transform duration-[8s] hover:scale-105"
                    priority
                />
            </div>

            <div className="relative z-30 w-full pt-0 md:pt-2 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl space-y-4 md:space-y-6">
                        <div className="space-y-4">
                            {/* Hero display title — Barlow Condensed Black */}
                            <h1 className="text-display font-display font-black text-white text-[clamp(5rem,14vw,9rem)] leading-[0.9] drop-shadow-2xl text-shadow-hero animate-fade-in-up [animation-delay:200ms]">
                                Talent <br />
                                <span className="text-brand-red">for</span> <br />
                                Education.
                            </h1>
                        </div>

                        {/* Layout: Paragraph and Buttons side-by-side to save vertical space */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10 pt-2 border-t border-white/20">
                            <p className="font-body text-white/90 text-xl md:text-2xl max-w-lg animate-fade-in-up [animation-delay:400ms] leading-relaxed drop-shadow-lg flex-1">
                                Empowering Kenya's elite youth athletes through comprehensive scholarships, world-class training, and lifelong mentorship.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row md:flex-col gap-4 animate-fade-in-up [animation-delay:600ms] shrink-0">
                                <Link href="/programs">
                                    <Button variant="primary" size="lg" className="w-full sm:min-w-[220px] py-4 text-lg shadow-2xl shadow-brand-red/40">
                                        Our Programs
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg" className="w-full sm:min-w-[220px] py-4 text-lg border-white text-white hover:bg-white hover:text-brand-green">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function HeroSection() {
    return (
        <section className="flex flex-col w-full">
            <HeroSpacer />
            
            {/* The main hero area starts only AFTER the spacer */}
            <div className="relative h-[calc(100vh-192px)] min-h-[600px] w-full flex items-start overflow-hidden bg-brand-green">
                <HeroBackground />
                <HeroContent />
            </div>
        </section>
    )
}
