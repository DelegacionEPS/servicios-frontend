import type { PageLoad } from "./$types"
import Papa from "papaparse"

function parseCSV(csv: String) {
	// Parse CSV
    csv = "GRADO,P\n" + csv;
	const parsedData = Papa.parse(csv, { header: true });

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

export const load = (async ({ fetch }) => {
	//const res = await fetch('/api/upload');
    const res = await fetch('/api/upload', {
        method: 'GET'
    });
	if (!res.ok) {
		console.error('Error al leer el CSV desde el servidor');
		return { names: [], percentages: [] };
	}

	const csvText = await res.text();
	const { names, percentages } = parseCSV(csvText.substr(csvText.indexOf(",") + 2));

	return {
		names,
		percentages
	};
}) satisfies PageLoad;
