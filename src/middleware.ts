import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Define the encrypted admin path dynamically
function getAdminPath(): string {
    const path = process.env.NEXT_PUBLIC_ADMIN_PATH || '/koech-secure-portal'
    return path.startsWith('/') ? path : `/${path}`
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const adminPath = getAdminPath()

    // Block direct /admin access - return 404
    // Allow internal rewrites identified by the special search param
    if (pathname.startsWith('/admin') && !request.nextUrl.searchParams.has('x_rewrite')) {
        return NextResponse.rewrite(new URL('/404', request.url))
    }

    // Check if accessing encrypted admin path
    if (pathname.startsWith(adminPath)) {
        // Log for debugging
        console.log(`[Middleware] Admin path access: ${pathname}`)

        // Rewrite the URL to /admin internally
        // Example: /landson-secure-admin-2026-942462484/login -> /admin/login
        const internalPath = pathname.replace(adminPath, '/admin')
        console.log(`[Middleware] Rewriting to: ${internalPath}`)

        const url = request.nextUrl.clone()
        url.pathname = internalPath
        // Add marker to allow this request to pass the /admin block
        url.searchParams.set('x_rewrite', 'true')

        // Allow login page without authentication
        if (pathname === `${adminPath}/login`) {
            return NextResponse.rewrite(url)
        }

        // Create Supabase client for server-side
        let response = NextResponse.rewrite(url)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        request.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                        response = NextResponse.rewrite(url)
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                    },
                    remove(name: string, options: CookieOptions) {
                        request.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                        response = NextResponse.rewrite(url)
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                    },
                },
            }
        )

        // Check authentication
        const { data: { session } } = await supabase.auth.getSession()

        console.log(`[Middleware] Session found: ${!!session}`)

        if (!session) {
            console.log(`[Middleware] No session, redirecting to login`)
            // Redirect to login if not authenticated
            // const loginUrl = new URL(`${adminPath}/login`, request.url)
            // return NextResponse.redirect(loginUrl)
        }

        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
