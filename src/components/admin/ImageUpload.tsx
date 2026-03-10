'use client'

import React, { useState, useRef } from 'react'
import { uploadImage, validateImageFile } from '@/lib/storage'
import styles from './ImageUpload.module.css'

interface ImageUploadProps {
    onUploadComplete: (url: string) => void
    currentImageUrl?: string
    folder?: string
    label?: string
}

export default function ImageUpload({
    onUploadComplete,
    currentImageUrl,
    folder = '',
    label = 'Upload Image'
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setError(null)

        // Validate file
        const validation = validateImageFile(file, 5)
        if (!validation.valid) {
            setError(validation.error)
            return
        }

        // Show preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Upload file
        setUploading(true)
        const { url, error: uploadError } = await uploadImage(file, folder)
        setUploading(false)

        if (uploadError) {
            setError(uploadError)
            return
        }

        if (url) {
            onUploadComplete(url)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>

            <div className={styles.uploadArea} onClick={handleClick}>
                {preview ? (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Preview" className={styles.preview} />
                        <div className={styles.overlay}>
                            <span>Click to change</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p>Click to upload image</p>
                        <span>JPEG, PNG, WebP, or GIF (max 5MB)</span>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                className={styles.fileInput}
            />

            {uploading && (
                <div className={styles.uploading}>
                    <div className={styles.spinner}></div>
                    <span>Uploading...</span>
                </div>
            )}

            {error && (
                <div className={styles.error}>{error}</div>
            )}
        </div>
    )
}
