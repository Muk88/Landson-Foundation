'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface NewsItem {
    id: string
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
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div className="max-w-2xl space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-brand-red-soft text-brand-red font-bold text-xs uppercase tracking-[0.2em] rounded-full">
                            Latest Updates
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 leading-tight">
                            Stay Updated with Our <span className="text-brand-red underline decoration-brand-red/10 underline-offset-8">Progress</span>
                        </h2>
                    </div>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => router.push('/news')}
                        className="hidden md:flex"
                    >
                        View All News
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestNews.map((news, index) => (
                        <article 
                            key={news.id} 
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            onClick={() => router.push(`/news/${news.id}`)}
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
                                    <span className="px-4 py-2 bg-brand-green text-white font-bold text-[10px] uppercase tracking-widest rounded-lg shadow-lg">
                                        {news.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <span className="text-brand-red font-bold text-xs uppercase tracking-widest">{news.date}</span>
                                <h3 className="text-2xl font-heading font-black text-gray-900 group-hover:text-brand-red transition-colors line-clamp-2 min-h-[4rem]">
                                    {news.title}
                                </h3>
                                <div className="pt-4 flex items-center gap-2 text-brand-green font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                    Read Full Story
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                
                <div className="mt-12 md:hidden">
                    <Button 
                        fullWidth 
                        variant="outline" 
                        size="lg" 
                        onClick={() => router.push('/news')}
                    >
                        View All News
                    </Button>
                </div>
            </div>
        </section>
    )
}
