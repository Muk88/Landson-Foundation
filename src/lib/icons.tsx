import React from 'react'
import {
    GraduationCap,
    Trophy,
    Users,
    Heart,
    Globe,
    BookOpen,
    Medal,
    Calendar,
    MapPin,
    ArrowRight,
    Target,
    Star,
    Zap,
    Flag,
    Smile,
    Activity,
    School,
    Layout,
    CheckCircle,
    Briefcase,
    Download,
    ArrowLeft
} from 'lucide-react'

// Define the available icons for the picker
export const AVAILABLE_ICONS = [
    { name: 'graduation-cap', icon: GraduationCap, label: 'Education' },
    { name: 'trophy', icon: Trophy, label: 'Achievement' },
    { name: 'users', icon: Users, label: 'Community' },
    { name: 'heart', icon: Heart, label: 'Care' },
    { name: 'globe', icon: Globe, label: 'Global' },
    { name: 'book-open', icon: BookOpen, label: 'Learning' },
    { name: 'medal', icon: Medal, label: 'Winning' },
    { name: 'school', icon: School, label: 'School' },
    { name: 'activity', icon: Activity, label: 'Athletics' },
    { name: 'target', icon: Target, label: 'Goals' },
    { name: 'star', icon: Star, label: 'Excellence' },
    { name: 'briefcase', icon: Briefcase, label: 'Career' },
    { name: 'calendar', icon: Calendar, label: 'Event' },
    { name: 'map-pin', icon: MapPin, label: 'Location' },
    { name: 'flag', icon: Flag, label: 'Milestone' },
    { name: 'zap', icon: Zap, label: 'Energy' },
    { name: 'smile', icon: Smile, label: 'Youth' },
    { name: 'download', icon: Download, label: 'Download' },
    { name: 'arrow-left', icon: ArrowLeft, label: 'Back' },
]

// Helper to get component by name
export const getIconComponent = (name: string) => {
    const iconItem = AVAILABLE_ICONS.find(item => item.name === name)
    return iconItem ? iconItem.icon : null
}

// Component to render icon dynamically
export const Icon = ({ name, className = '', size = 24 }: { name: string, className?: string, size?: number }) => {
    const IconComponent = getIconComponent(name)

    if (!IconComponent) {
        // Fallback or return null
        return null
    }

    return <IconComponent className={className} size={size} />
}
