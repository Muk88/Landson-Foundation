import React from 'react'
import { HeroSkeleton, StoriesGridSkeleton } from '@/components/ui/Skeleton'

export default function StoriesLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="h-[72px] bg-white border-b border-gray-100" />
            <HeroSkeleton />
            <section className="py-16 md:py-24 bg-white">
                <div className="container-custom">
                    <div className="mb-16 space-y-4">
                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-full" />
                        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-xl" />
                    </div>
                    <StoriesGridSkeleton count={6} />
                </div>
            </section>
        </div>
    )
}
