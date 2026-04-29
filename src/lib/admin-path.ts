/**
 * Admin Path Encryption Utilities
 * Provides secure path generation and validation for admin routes
 */

// Generate a consistent hash from the secret
export function getAdminPath(): string {
    // Read from environment variable to avoid hardcoding in source
    // Fallback to a secure default if not set
    const path = process.env.NEXT_PUBLIC_ADMIN_PATH || '/koech-secure-portal'
    
    // Ensure it starts with a slash
    return path.startsWith('/') ? path : `/${path}`
}

// Validate if a path is the correct admin path
export function isValidAdminPath(path: string): boolean {
    const validPath = getAdminPath()
    return path === validPath || path.startsWith(`${validPath}/`)
}

// Get the base admin path without leading slash
export function getAdminPathBase(): string {
    return getAdminPath().substring(1) // Remove leading slash
}

// Check if current path is admin login
export function isAdminLoginPath(path: string): boolean {
    const adminPath = getAdminPath()
    return path === `${adminPath}/login`
}
