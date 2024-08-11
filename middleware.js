import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = await getToken({ req: request, secret: "hello" })
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && token.role !== "admin") {
        return NextResponse.redirect(new URL('/clienthome', request.url))
    }

    return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin',
}