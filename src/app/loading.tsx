import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-8">
            {/* Animated logo mark */}
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-[6px] border-4 border-brand-green/30 rounded-full border-b-transparent animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
            </div>
            {/* Text */}
            <div className="flex flex-col items-center gap-2">
                <span className="font-display font-black text-2xl uppercase tracking-[0.06em] text-ink animate-pulse">
                    Landson Foundation
                </span>
                <span className="font-display font-bold text-[10px] uppercase tracking-[0.3em] text-muted">
                    Loading Excellence
                </span>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-red rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
        </div>
    )
}
