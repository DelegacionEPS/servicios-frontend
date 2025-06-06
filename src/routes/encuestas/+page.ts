import type { PageLoad } from "./$types"
import Papa from "papaparse"

const FCSJ = "36.57%"
const FHCD = "37.26%"

export const load = (async () => {
    return {}
}) satisfies PageLoad

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,38.7%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,32.25%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,48.48%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,35.81%
Grado en Ciencia e Ingeniería de Datos,40.78%
Grado en Ciencias,5.00%
Grado en Ingeniería Aeroespacial,49.73%
Grado en Ingeniería Biomédica,39.46%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,44.37%
Grado en Ingeniería de la Energía,34.04%
Grado en Ingeniería de Sonido e Imagen,35.98%
Grado en Ingeniería Eléctrica,30.4%
Grado en Ingeniería Electrónica Industrial y Automática,39.11%
Grado en Ingeniería en Tecnologías de Telecomunicación,37.65%
Grado en Ingeniería en Tecnologías Industriales,33.17%
Grado en Ingeniería Física,59.28%
Grado en Ingeniería Informática - Leganés,40.37%
Grado en Ingeniería Informática - Colmenarejo,36.39%
Grado en Ingeniería Mecánica,33.63%
Grado en Ingeniería Robótica,46.95%
Grado en Ingeniería Telemática,37.23%
Grado en Matemática Aplicada y Computación,54.01%`

function parseCSV(csv: String) {
    // Parse CSV
    const parsedData = Papa.parse(csv, { header: true })
    parsedData.data.push({ GRADO: "FCSJ", P: FCSJ })
    parsedData.data.push({ GRADO: "FHCD", P: FHCD })

    // Sort data by percentage
    parsedData.data.sort((a: { [x: string]: string }, b: { [x: string]: string }) => {
        const percentageA = parseFloat(a["P"].replace("%", ""))
        const percentageB = parseFloat(b["P"].replace("%", ""))
        return percentageB - percentageA
    })

    // Arrays to store names and percentages
    let names: any[] = []
    let percentages: any[] = []

    // Iterate through each row of parsed data
    parsedData.data.forEach((row: { [x: string]: string }) => {
        // Extract name and percentage from each row
        const name = row["GRADO"]
        const percentage = parseFloat(row["P"])

        // Push name and percentage to respective arrays
        names.push(name)
        percentages.push(percentage)
    })

    // Add the index to the names at the end
    names.forEach((name, index) => {
        names[index] = `${name} (${index + 1})`
    })

    names.forEach((name, index) => {
        names[index] = name
            .replace(
                "Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación",
                "Datos & Teleco"
            )
            .replace(
                "Doble Grado en Ingeniería Física e Ingeniería en Tecnologías Industriales",
                "Física & Industriales"
            )
            .replace("Administración de Empresas", "ADE")
            .replace("Grado en Ingeniería", "")
            .replace("Ingeniería", "")
            .replace("Tecnologías", "")
            .replace("Grado", "")
            .replace("Doble", "")
            .replace(" de", " ")
            .replace(" en", " ")
            .replace(" la", " ")
            .trimStart()
    })

    // Return the arrays
    return { names, percentages }
}

export const _data = parseCSV(csv_data)
