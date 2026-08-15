import React from 'react'
import { HeroSkeleton, NewsGridSkeleton } from '@/components/ui/Skeleton'

export default function NewsLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header placeholder */}
            <div className="h-[72px] bg-white border-b border-gray-100" />

            {/* Hero skeleton */}
            <HeroSkeleton />

            {/* News grid skeleton */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container-custom">
                    {/* Section label + heading */}
                    <div className="mb-16 space-y-4">
                        <div className="h-4 w-28 bg-gray-200 animate-pulse rounded-full" />
                        <div className="h-10 w-72 bg-gray-200 animate-pulse rounded-xl" />
                    </div>
                    <NewsGridSkeleton count={6} />
                </div>
            </section>
        </div>
    )
}
