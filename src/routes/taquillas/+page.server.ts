import type { PageServerLoad, Actions } from "./$types"
import { error } from "@sveltejs/kit"
import size from "$lib/size"
import { BASE_URL_API, prueba, reservaTaquilla, TOKEN, ocupacionEdificios } from "$lib/api_taquillas"

export const actions = {
    registerTaquilla: async ({ cookies, request }) => {
        const data = await request.formData()
        const taquilla = data.get("taquilla")
        const nia = data.get("nia")
        const result = prueba(taquilla, nia)
        return result
    },
    aquireTaquilla: async ({ cookies, request }) => {
        const data = await request.formData()
        const taquilla = data.get("taquilla")
        const nia = data.get("nia")
        const result = reservaTaquilla(taquilla, nia)
        return result
    }
} satisfies Actions


export const load: PageServerLoad = async ({ }) => {
    const ocupacionEdificiosResponse = await ocupacionEdificios()

    return {
        size: size,
        ocupancy: ocupacionEdificiosResponse
    }
}