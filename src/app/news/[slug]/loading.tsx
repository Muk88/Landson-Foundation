import React from 'react'
import { HeroSkeleton, ArticleSkeleton } from '@/components/ui/Skeleton'

export default function NewsDetailLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="h-[72px] bg-white border-b border-gray-100" />
            {/* Hero */}
            <div className="relative h-[70vh] min-h-[500px] bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 gap-5 px-4">
                    <div className="h-4 w-24 bg-gray-700 animate-pulse rounded-full" />
                    <div className="h-14 w-3/4 max-w-2xl bg-gray-700 animate-pulse rounded-xl" />
                    <div className="h-14 w-1/2 max-w-xl bg-gray-700 animate-pulse rounded-xl" />
                </div>
            </div>
            {/* Article body */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container-custom">
                    <ArticleSkeleton />
                </div>
            </section>
        </div>
    )
}
