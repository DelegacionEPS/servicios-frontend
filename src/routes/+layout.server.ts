import type { LayoutServerLoad } from "./$types"
import { BASE_URL_API, TOKEN, add_user_db, add_association_db } from "$lib/api_taquillas"

// load serverside data
export const load: LayoutServerLoad = async event => {
    const fetchAuthorizedEmails = async (rango: string) => {
        try {
            const url = `${BASE_URL_API}/api/authorizedEmails/${rango}${TOKEN}`
            const res = await fetch(url)

            if (!res.ok) {
                console.error("Failed fetching authorized emails", res.status, res.statusText, url)
                return []
            }

            const data = await res.json()
            if (!Array.isArray(data)) return []
            return data
        } catch (error) {
            console.error("Error fetching authorized emails:", error)
            return []
        }
    }

    let session = await event.locals.auth()

    // Store the user in the Database using the api
    if (session?.user?.email?.endsWith("@alumnos.uc3m.es")) {
        add_user_db(session?.user?.email, session?.user?.name)
    } else if (session?.user?.email?.endsWith("uc3m.es")) {
        add_association_db(session?.user?.email, session?.user.name)
    }

    let emailsDespacho = await fetchAuthorizedEmails("atencion")
    if (!Array.isArray(emailsDespacho)) {
        emailsDespacho = []
    }
    let emailsEscuela = await fetchAuthorizedEmails("escuela")
    if (!Array.isArray(emailsEscuela)) {
        emailsEscuela = []
    }

    emailsDespacho = emailsDespacho.concat(emailsEscuela)
    // remove null values
    emailsDespacho = emailsDespacho.filter((email: String) => email !== null)

    // Improve SEO by adding sitemap metadata
    const baseUrl = event.url.origin
    const routes = [
        "/",
        "/taquillas",
        "/osciloscopio",
        "/encuestas",
        "/perfil"
    ]
    
    const sitemapData = routes.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFreq: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1.0 : 0.8
    }))

    return {
        session: session,
        authorizedEmailsLayoutEscuela: emailsEscuela,
        authorizedEmailsLayoutDespacho: emailsDespacho,
        sitemapData: sitemapData
    }
}
