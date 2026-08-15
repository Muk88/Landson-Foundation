import React from 'react'
import { HeroSkeleton, ProgramsGridSkeleton } from '@/components/ui/Skeleton'

export default function ProgramsLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="h-[72px] bg-white border-b border-gray-100" />
            <HeroSkeleton />
            <section className="py-16 md:py-24 bg-white">
                <div className="container-custom">
                    <div className="mb-16 space-y-4">
                        <div className="h-4 w-28 bg-gray-200 animate-pulse rounded-full" />
                        <div className="h-10 w-80 bg-gray-200 animate-pulse rounded-xl" />
                    </div>
                    <ProgramsGridSkeleton count={4} />
                </div>
            </section>
        </div>
    )
}
