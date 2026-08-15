import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Icon } from '@/lib/icons'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import HeroSpacer from '@/components/ui/HeroSpacer'
import Button from '@/components/ui/Button'

// Enable ISR
export const revalidate = 3600

async function getNews() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: news, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }

    return news.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        date: new Date(item.published_date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
        }),
        category: item.category,
        image: item.image_url,
        excerpt: item.excerpt
    }))
}

export default async function NewsPage() {
    const newsItems = await getNews()

    return (
        <div className="flex flex-col min-h-screen bg-white"><main className="flex-grow pt-[72px] bg-white">
                <HeroSpacer />
                {/* Hero Section */}
                <section className="relative min-h-[60vh] lg:h-[70vh] py-16 lg:py-0 flex items-center overflow-hidden bg-brand-green">
                    <Image
                        src="/images/background2.jpg"
                        alt="News & Updates"
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
                                    News & Updates
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-display font-black text-white text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.85] tracking-tight drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
                                <span className="text-brand-red">Latest.</span> <br />
                                News & <br />
                                <span className="text-brand-red">Updates.</span>
                            </h1>
                        </div>

                        {/* Layout: Paragraph on the left, Buttons on the right to save vertical space */}
                        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 lg:gap-10 pt-3 border-t border-white/20 max-w-5xl animate-fade-in-up [animation-delay:400ms]">
                            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg flex-1">
                                Stay informed with the latest announcements, student achievements, community events, partnerships, and inspiring stories from across the Landson Foundation.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
                                <a href="#news-grid" className="group w-full sm:w-auto">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg shadow-2xl shadow-brand-red/40 flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
                                        Explore News
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Button>
                                </a>
                                <Link href="/contact" className="group w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-[200px] py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-brand-green group-hover:-translate-y-1 transition-transform">
                                        Contacts
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* News Grid */}
                <section id="news-grid" className="py-16 md:py-24 bg-white relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                            {newsItems.map((item: any, index: number) => (
                                <AnimateOnScroll
                                    key={item.id}
                                    variant="fade-up"
                                    delay={index * 100}
                                    duration="slow"
                                    easing="elegant"
                                >
                                    <Link
                                        href={`/news/${item.slug || item.id}`}
                                        className="group flex flex-col space-y-8"
                                    >
                                        <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="label-text px-4 py-2 bg-brand-red text-white rounded-lg shadow-lg inline-block">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-4 px-2">
                                            <span className="font-display font-bold text-brand-green text-[11px] uppercase tracking-[0.2em]">{item.date}</span>
                                            <h2 className="font-heading font-black text-ink text-2xl md:text-3xl group-hover:text-brand-red transition-colors leading-tight line-clamp-2">
                                                {item.title}
                                            </h2>
                                            <p className="font-body text-body text-lg leading-relaxed line-clamp-3">
                                                {item.excerpt}
                                            </p>
                                            <div className="pt-2 flex items-center gap-2 text-brand-green font-display font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                                Read Full Story
                                                <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </AnimateOnScroll>
                            ))}
                        </div>
                        
                        {newsItems.length === 0 && (
                            <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-bold text-xl italic tracking-tight">Stay tuned for upcoming news and updates.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main></div>
    )
}
