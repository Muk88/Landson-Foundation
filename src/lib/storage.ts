import { createClient } from '@/lib/supabase'

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET!

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param folder - Optional folder path within the bucket (e.g., 'news', 'programs', 'stories')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
    file: File,
    folder: string = ''
): Promise<{ url: string | null; error: string | null }> {
    try {
        const supabase = createClient()

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = folder ? `${folder}/${fileName}` : fileName

        // Upload file
        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Upload error:', error)
            return { url: null, error: error.message }
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(data.path)

        return { url: publicUrl, error: null }
    } catch (error: any) {
        console.error('Upload exception:', error)
        return { url: null, error: error.message || 'Upload failed' }
    }
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The full URL or path of the image to delete
 * @returns Success status
 */
export async function deleteImage(
    imageUrl: string
): Promise<{ success: boolean; error: string | null }> {
    try {
        const supabase = createClient()

        // Extract path from URL
        // The URL format is typically: .../storage/v1/object/public/{bucket}/{path}
        const path = imageUrl.split(`/storage/v1/object/public/${STORAGE_BUCKET}/`)[1]

        if (!path) {
            return { success: false, error: 'Invalid image URL' }
        }

        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([path])

        if (error) {
            console.error('Delete error:', error)
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error: any) {
        console.error('Delete exception:', error)
        return { success: false, error: error.message || 'Delete failed' }
    }
}

/**
 * Validate image file
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 * @returns Validation result
 */
export function validateImageFile(
    file: File,
    maxSizeMB: number = 5
): { valid: boolean; error: string | null } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.'
        }
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB. Please upload a smaller image.`
        }
    }

    return { valid: true, error: null }
}
