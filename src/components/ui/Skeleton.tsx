import React from 'react'

// ─── Shimmer pulse animation (add to globals.css @keyframes via Tailwind) ──────
// Uses animate-pulse for the base shimmer effect

interface SkeletonProps {
    className?: string
}

// Base skeleton block
export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`bg-gray-200 animate-pulse rounded-lg ${className}`}
            aria-hidden="true"
        />
    )
}

// ─── Page-level hero skeleton ────────────────────────────────────────────────
export function HeroSkeleton() {
    return (
        <div className="relative h-[60vh] min-h-[400px] w-full bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
                <Skeleton className="h-4 w-32 rounded-full bg-gray-700" />
                <Skeleton className="h-16 md:h-24 w-3/4 max-w-lg bg-gray-700 rounded-xl" />
                <Skeleton className="h-16 md:h-24 w-2/4 max-w-md bg-gray-700 rounded-xl" />
                <Skeleton className="h-6 w-96 max-w-full bg-gray-700 mt-4 rounded-lg" />
            </div>
        </div>
    )
}

// ─── News / Stories card skeleton ────────────────────────────────────────────
export function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-6">
            {/* Image */}
            <Skeleton className="aspect-[16/10] w-full rounded-[2rem] bg-gray-200" />
            {/* Content */}
            <div className="space-y-3 px-2">
                <Skeleton className="h-3 w-24 rounded-full bg-gray-200" />
                <Skeleton className="h-7 w-full rounded-lg bg-gray-200" />
                <Skeleton className="h-7 w-4/5 rounded-lg bg-gray-200" />
                <Skeleton className="h-4 w-full rounded bg-gray-200" />
                <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
                <Skeleton className="h-4 w-5 rounded bg-gray-200 mt-4" />
            </div>
        </div>
    )
}

// ─── Story card skeleton (square image) ──────────────────────────────────────
export function StoryCardSkeleton() {
    return (
        <div className="flex flex-col space-y-6">
            <Skeleton className="aspect-square w-full rounded-[2.5rem] bg-gray-200" />
            <div className="space-y-3 px-2">
                <Skeleton className="h-7 w-4/5 rounded-lg bg-gray-200" />
                <Skeleton className="h-4 w-full rounded bg-gray-200" />
                <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
                <Skeleton className="h-4 w-1/2 rounded bg-gray-200" />
            </div>
        </div>
    )
}

// ─── Program card skeleton ────────────────────────────────────────────────────
export function ProgramCardSkeleton() {
    return (
        <div className="rounded-[2rem] overflow-hidden border border-gray-100 bg-white shadow-sm">
            <Skeleton className="h-64 w-full rounded-none bg-gray-200" />
            <div className="p-8 space-y-4">
                <Skeleton className="h-4 w-20 rounded-full bg-gray-200" />
                <Skeleton className="h-8 w-3/4 rounded-lg bg-gray-200" />
                <Skeleton className="h-4 w-full rounded bg-gray-200" />
                <Skeleton className="h-4 w-5/6 rounded bg-gray-200" />
                <Skeleton className="h-10 w-36 rounded-full bg-gray-200 mt-6" />
            </div>
        </div>
    )
}

// ─── Grid of card skeletons ───────────────────────────────────────────────────
export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    )
}

export function StoriesGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {Array.from({ length: count }).map((_, i) => (
                <StoryCardSkeleton key={i} />
            ))}
        </div>
    )
}

export function ProgramsGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Array.from({ length: count }).map((_, i) => (
                <ProgramCardSkeleton key={i} />
            ))}
        </div>
    )
}

// ─── Article detail skeleton ──────────────────────────────────────────────────
export function ArticleSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-6 w-40 rounded-full bg-gray-200" />
            <Skeleton className="h-12 w-full rounded-xl bg-gray-200" />
            <Skeleton className="h-12 w-3/4 rounded-xl bg-gray-200" />
            <Skeleton className="h-5 w-48 rounded bg-gray-200" />
            <div className="space-y-3 pt-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className={`h-4 rounded bg-gray-200 ${i % 4 === 3 ? 'w-3/4' : 'w-full'}`} />
                ))}
            </div>
        </div>
    )
}

// ─── Impact stats skeleton ────────────────────────────────────────────────────
export function ImpactStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-12 w-12 rounded-xl bg-white/20" />
                    <Skeleton className="h-14 w-28 rounded-lg bg-white/20" />
                    <Skeleton className="h-3 w-32 rounded bg-white/20" />
                </div>
            ))}
        </div>
    )
}

// ─── Home news section skeleton ───────────────────────────────────────────────
export function HomeNewsSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                    <Skeleton className="h-64 w-full rounded-none bg-gray-200" />
                    <div className="p-8 space-y-3">
                        <Skeleton className="h-3 w-24 rounded-full bg-gray-200" />
                        <Skeleton className="h-6 w-full rounded-lg bg-gray-200" />
                        <Skeleton className="h-6 w-4/5 rounded-lg bg-gray-200" />
                        <Skeleton className="h-4 w-32 rounded bg-gray-200 mt-4" />
                    </div>
                </div>
            ))}
        </div>
    )
}
