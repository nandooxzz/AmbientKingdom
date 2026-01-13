import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import admin from "firebase-admin"

// Inicializar Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASEADM_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASEADM_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    })
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone()
    const token = req.cookies.get("token")?.value

    // Se a rota não for /admin, não precisa checar
    if (!url.pathname.startsWith("/admin")) {
        return NextResponse.next()
    }

    if (!token) {
        // Não logado → redireciona para /admin (mesma rota com login)
        url.pathname = "/admin"
        return NextResponse.redirect(url)
    }

    try {
        // Verifica o ID token com Firebase Admin
        await admin.auth().verifyIdToken(token)
        return NextResponse.next() // Token válido → deixa passar
    } catch (err) {
        // Token inválido ou expirado
        url.pathname = "/admin"
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ["/admin/:path*"],
}