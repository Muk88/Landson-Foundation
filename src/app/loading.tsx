import React from 'react'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-8">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="font-heading font-black text-2xl uppercase tracking-tighter text-gray-900 animate-pulse">Landson Foundation</span>
                <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-gray-400">Loading Excellence</span>
            </div>
        </div>
    )
}
