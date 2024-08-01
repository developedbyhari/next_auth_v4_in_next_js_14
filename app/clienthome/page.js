"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"

function ClientHome() {
    const session = useSession()
    return (
        <>
            {JSON.stringify(session)}
            {session.status !== "unauthenticated" && <button onClick={() => signOut()} >signOut</button>}
        </>
    )
}


export default function AuthWrapper() {
    return (
        <SessionProvider >
            <ClientHome />
        </SessionProvider>
    )
}