import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '21.45%';
const FHCD = '19.70%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,25.34%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,21.65%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,30.3%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,21.55%
Grado en Ciencia e Ingeniería de Datos,25.11%
Grado en Ciencias,37.5%
Grado en Ingeniería Aeroespacial,36.12%
Grado en Ingeniería Biomédica,18.15%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,32.61%
Grado en Ingeniería de la Energía,15.89%
Grado en Ingeniería de Sonido e Imagen,17.53%
Grado en Ingeniería Eléctrica,18.15%
Grado en Ingeniería Electrónica Industrial y Automática,24.5%
Grado en Ingeniería en Tecnologías de Telecomunicación,29.16%
Grado en Ingeniería en Tecnologías Industriales,20.48%
Grado en Ingeniería Física,38.76%
Grado en Ingeniería Informática - Leganés,28.14%
Grado en Ingeniería Informática - Colmenarejo,29.61%
Grado en Ingeniería Mecánica,24.72%
Grado en Ingeniería Robótica,31.54%
Grado en Ingeniería Telemática,20.06%
Grado en Matemática Aplicada y Computación,30.23%`;

function parseCSV(csv: String) {
	// Parse CSV
	const parsedData = Papa.parse(csv, { header: true });
	parsedData.data.push({ GRADO: 'FCSJ', P: FCSJ });
	parsedData.data.push({ GRADO: 'FHCD', P: FHCD });

	// Sort data by percentage
	parsedData.data.sort((a: { [x: string]: string }, b: { [x: string]: string }) => {
		const percentageA = parseFloat(a['P'].replace('%', ''));
		const percentageB = parseFloat(b['P'].replace('%', ''));
		return percentageB - percentageA;
	});

	// Arrays to store names and percentages
	let names: any[] = [];
	let percentages: any[] = [];

	// Iterate through each row of parsed data
	parsedData.data.forEach((row: { [x: string]: string }) => {
		// Extract name and percentage from each row
		const name = row['GRADO'];
		const percentage = parseFloat(row['P']);

		// Push name and percentage to respective arrays
		names.push(name);
		percentages.push(percentage);
	});

	// Add the index to the names at the end
	names.forEach((name, index) => {
		names[index] = `${name} (${index + 1})`;
	});

	names.forEach((name, index) => {
		names[index] = name
			.replace(
				'Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación',
				'Datos & Teleco'
			)
			.replace(
				'Doble Grado en Ingeniería Física e Ingeniería en Tecnologías Industriales',
				'Física & Industriales'
			)
			.replace('Administración de Empresas', 'ADE')
			.replace('Grado en Ingeniería', '')
			.replace('Ingeniería', '')
			.replace('Tecnologías', '')
			.replace('Grado', '')
			.replace('Doble', '')
			.replace(' de', ' ')
			.replace(' en', ' ')
			.replace(' la', ' ')
			.trimStart();
	});

	// Return the arrays
	return { names, percentages };
}

export const _data = parseCSV(csv_data);
