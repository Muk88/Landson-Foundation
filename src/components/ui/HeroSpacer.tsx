import React from 'react'

export default function HeroSpacer() {
    return (
        <div className="relative w-full h-[120px] bg-white flex items-center justify-center overflow-hidden">
            {/* Optional subtle grid for visual texture inside the spacer, similar to premium sites */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        </div>
    )
}
