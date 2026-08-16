import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin"></div>
                <p className="font-display font-bold text-brand-green tracking-widest uppercase text-sm animate-pulse">Loading...</p>
            </div>
        </div>
    )
}
