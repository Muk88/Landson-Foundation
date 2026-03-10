import React from 'react'
import { AVAILABLE_ICONS } from '@/lib/icons' // Resolves to icons.tsx

interface IconPickerProps {
    value: string
    onChange: (iconName: string) => void
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    return (
        <div className="icon-picker">
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '0.75rem',
                marginTop: '0.5rem',
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '4px'
            }}>
                {AVAILABLE_ICONS.map((item) => {
                    const Icon = item.icon
                    const isSelected = value === item.name

                    return (
                        <button
                            key={item.name}
                            type="button"
                            onClick={() => onChange(item.name)}
                            title={item.label}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px',
                                border: isSelected ? '2px solid #e31e24' : '1px solid #e5e7eb',
                                borderRadius: '8px',
                                background: isSelected ? 'rgba(227, 30, 36, 0.05)' : '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                height: '80px'
                            }}
                        >
                            <Icon size={24} color={isSelected ? '#e31e24' : '#4b5563'} strokeWidth={isSelected ? 2.5 : 2} />
                            <span style={{
                                fontSize: '0.75rem',
                                color: isSelected ? '#e31e24' : '#6b7280',
                                textAlign: 'center',
                                fontWeight: isSelected ? 600 : 400,
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
            {!value && (
                <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    Select an icon to represent this program
                </p>
            )}
        </div>
    )
}
