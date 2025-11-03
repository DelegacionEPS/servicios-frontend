import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import "dotenv/config"

const { handle: authHandle } = SvelteKitAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    useSecureCookies: true,
    trustHost: true,
    debug: false,
    secret: process.env.AUTH_SECRET
})

export const handle = authHandle
