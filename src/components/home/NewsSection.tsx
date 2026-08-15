'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

interface NewsItem {
    id: string
    slug: string
    title: string
    date: string
    category: string
    image: string
}

interface NewsSectionProps {
    latestNews: NewsItem[]
}

export default function NewsSection({ latestNews }: NewsSectionProps) {
    const router = useRouter()

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div className="max-w-2xl space-y-4">
                        <AnimateOnScroll variant="fade-up" delay={0}>
                            <span className="inline-block px-4 py-1.5 bg-brand-red-soft rounded-full">
                                <span className="label-text text-brand-red">Latest Updates</span>
                            </span>
                        </AnimateOnScroll>
                        <AnimateOnScroll variant="fade-up" delay={80}>
                            <h2 className="font-heading font-extrabold text-ink text-4xl md:text-5xl leading-[1.08] tracking-[-0.02em]">
                                Stay Updated with Our{' '}
                                <span className="text-brand-red underline decoration-brand-red/10 underline-offset-8">Progress</span>
                            </h2>
                        </AnimateOnScroll>
                    </div>
                    <AnimateOnScroll variant="fade-in" delay={200}>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => router.push('/news')}
                            className="hidden md:flex"
                        >
                            View All News
                        </Button>
                    </AnimateOnScroll>
                </div>

                {/* Cards — staggered */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestNews.map((news, index) => (
                        <AnimateOnScroll
                            key={news.id}
                            variant="fade-up"
                            delay={index * 110}
                            duration="slow"
                            easing="elegant"
                        >
                            <article
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 h-full"
                                onClick={() => router.push(`/news/${news.slug}`)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.05]"
                                    />
                                    <div className="absolute top-6 right-6">
                                        <span className="label-text px-4 py-2 bg-brand-green text-white rounded-lg shadow-lg inline-block">
                                            {news.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-3">
                                    <span className="font-display font-bold text-brand-red text-[11px] uppercase tracking-[0.2em]">
                                        {news.date}
                                    </span>
                                    <h3 className="font-heading font-bold text-ink text-xl group-hover:text-brand-red transition-colors line-clamp-2 min-h-[3.5rem] leading-snug">
                                        {news.title}
                                    </h3>
                                    <div className="pt-3 flex items-center gap-2 text-brand-green font-display font-bold text-[11px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                                        Read Full Story
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </AnimateOnScroll>
                    ))}
                </div>

                <AnimateOnScroll variant="fade-up" delay={100} className="mt-12 md:hidden">
                    <Button fullWidth variant="outline" size="lg" onClick={() => router.push('/news')}>
                        View All News
                    </Button>
                </AnimateOnScroll>
            </div>
        </section>
    )
}
