import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Button from '@/components/ui/Button'
import { Icon } from '@/lib/icons'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import HeroSpacer from '@/components/ui/HeroSpacer'
import AlumniCarousel from '@/components/stories/AlumniCarousel'

// Enable ISR
export const revalidate = 3600

// Exact schema: id, name, title, story, achievement, image_url, year,
//               is_featured, youtube_url, images (jsonb), created_at, updated_at
async function getStories() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: stories, error } = await supabase
        .from('success_stories')
        .select('id, name, title, story, achievement, image_url, year, is_featured, youtube_url, images, created_at')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching stories:', error)
        return []
    }

    return stories.map((item: any) => ({
        id: item.id,
        name: item.name,              // Main card headline: "A Dream That Became A Reality"
        title: item.title,            // Subtitle: "Completion Of Landson Foundation Building"
        story: item.story,            // Full story text preview
        badge: item.achievement,      // Red badge tag: "Structures"
        image: item.image_url,        // Main image URL
        year: item.year ?? new Date(item.created_at).getFullYear(),
        is_featured: item.is_featured,
    }))
}

async function getAlumni() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: alumni, error } = await supabase
        .from('alumni')
        .select('id, name, current_role, quote, image_url, linkedin_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching alumni:', error)
        return []
    }

    return alumni
}

export default async function StoriesPage() {
    const stories = await getStories()
    const alumni = await getAlumni()

    return (
        <div className="flex flex-col min-h-screen bg-white"><main className="flex-grow pt-[72px] bg-white">
                <HeroSpacer />
                {/* Hero Section */}
                <section className="relative min-h-[60vh] lg:h-[70vh] py-16 lg:py-0 flex items-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/stories-hero.jpg"
                        alt="Success Stories"
                        fill
                        className="object-cover object-[center_30%] opacity-50 contrast-[1.1] saturate-[1.1] animate-slow-zoom"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-green/70 via-brand-green/40 to-brand-green/90"></div>

                    {/* Left-aligned editorial layout with 8-10% left padding on large screens */}
                    <div className="relative z-30 w-full px-6 md:pl-12 lg:pl-[10%] lg:pr-12 max-w-[1400px] space-y-4 md:space-y-6 pt-4">
                        <div className="space-y-3">
                            {/* Eyebrow Label */}
                            <div className="flex items-center gap-4 animate-fade-in-up">
                                <div className="w-12 h-0.5 bg-brand-red"></div>
                                <span className="font-display font-bold text-brand-red text-sm md:text-base uppercase tracking-[0.25em]">
                                    Success Journeys
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display font-black text-white text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
                                <span className="text-brand-red">Dreams.</span> <br />
                                Determination. <br />
                                <span className="text-brand-red">Destiny.</span>
                            </h1>
                        </div>

                        {/* Layout: Paragraph on the left, Buttons on the right to save vertical space */}
                        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 lg:gap-10 pt-3 border-t border-white/20 max-w-5xl animate-fade-in-up [animation-delay:400ms]">
                            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg flex-1">
                                Behind every achievement is a story of resilience, determination, and opportunity. Meet the athletes whose lives have been transformed through education, mentorship, and unwavering support.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                                <a href="#stories-grid" className="group w-full sm:w-auto">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-brand-red/40 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Explore Stories
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Button>
                                </a>
                                <Link href="/about" className="group w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-green group-hover:-translate-y-1 transition-transform">
                                        Meet Our Alumni
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stories Grid */}
                <section id="stories-grid" className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {stories.map((story: any, index: number) => (
                                <AnimateOnScroll
                                    key={story.id}
                                    variant="fade-up"
                                    delay={index * 100}
                                    duration="slow"
                                    easing="elegant"
                                >
                                    <Link
                                        href={`/stories/${story.id}`}
                                        className="group flex flex-col"
                                    >
                                    <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl mb-8 group-hover:-translate-y-4 group-hover:shadow-2xl transition-all duration-500">
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                                        {/* Year badge — top right */}
                                        <div className="absolute top-8 right-8">
                                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full font-bold text-xs">
                                                {story.year}
                                            </div>
                                        </div>

                                        {/* Name + achievement badge — bottom overlay */}
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <h3 className="text-2xl font-heading font-black text-white leading-tight mb-3 tracking-tighter">
                                                {story.name}
                                            </h3>
                                            {story.badge && (
                                                <span className="inline-block px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                    {story.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card body — title + story excerpt */}
                                    <div className="space-y-4 px-2">
                                        <h4 className="text-xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors line-clamp-2">
                                            {story.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">
                                            {story.story}
                                        </p>
                                        <div className="pt-4 flex items-center gap-3 text-brand-green font-bold text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
                                            Read Full Journey
                                            <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    </Link>
                                </AnimateOnScroll>
                            ))}
                        </div>

                        {stories.length === 0 && (
                            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium text-lg italic">No success stories found. Inspiring journeys are in the making.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Alumni Section */}
                {alumni && alumni.length > 0 && (
                    <section className="py-16 md:py-24 bg-brand-green relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
                        </div>
                        <div className="container-custom relative z-10">
                            <AnimateOnScroll variant="fade-up" delay={0} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
                                    <span className="label-text text-white">Our Alumni</span>
                                </span>
                                <h2 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-[-0.02em]">
                                    Where Are They <span className="text-brand-red">Now?</span>
                                </h2>
                            </AnimateOnScroll>

                            <AlumniCarousel alumni={alumni} />
                        </div>
                    </section>
                )}

                {/* Final Story CTA (Shrunk) */}
                <section className="py-16 bg-gray-50">
                    <div className="container-custom text-center space-y-6">
                        <AnimateOnScroll variant="fade-up" delay={0}>
                            <h2 className="font-display font-black text-ink text-3xl md:text-4xl leading-tight tracking-[-0.02em] max-w-3xl mx-auto">Help us create more stories like these.</h2>
                        </AnimateOnScroll>
                        <AnimateOnScroll variant="scale-up" delay={100} easing="spring">
                            <Link href="/contact" className="inline-block mt-4">
                                <Button variant="primary" size="md" className="text-lg px-8 shadow-xl shadow-brand-red/20">
                                    Get Involved
                                </Button>
                            </Link>
                        </AnimateOnScroll>
                    </div>
                </section>
            </main></div>
    )
}
