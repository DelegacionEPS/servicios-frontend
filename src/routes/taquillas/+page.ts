import type { PageLoad } from "./$types"

export function _handleResult(result: any) {
    const code = result.status
    const body = result.body

    if (code === 200) {
        alert("Taquilla reservada correctamente")
    } else {
        alert("Error al reservar la taquilla")
    }
}

export const load = (({ params, data }) => {
    return {
        size: data.size,
        ocupancy: data.ocupancy
    }
}) satisfies PageLoad
