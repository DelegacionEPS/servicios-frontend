import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '25.76%';
const FHCD = '23.40%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,29.28%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,25.54%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,33.33%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,25.14%
Grado en Ciencia e Ingeniería de Datos,30.56%
Grado en Ciencias,37.5%
Grado en Ingeniería Aeroespacial,43.82%
Grado en Ingeniería Biomédica,19.88%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,35.81%
Grado en Ingeniería de la Energía,25.83%
Grado en Ingeniería de Sonido e Imagen,24.17%
Grado en Ingeniería Eléctrica,22.16%
Grado en Ingeniería Electrónica Industrial y Automática,28.11%
Grado en Ingeniería en Tecnologías de Telecomunicación,31.29%
Grado en Ingeniería en Tecnologías Industriales,24.24%
Grado en Ingeniería Física,44.65%
Grado en Ingeniería Informática - Leganés,30.48%
Grado en Ingeniería Informática - Colmenarejo,30.87%
Grado en Ingeniería Mecánica,27.38%
Grado en Ingeniería Robótica,37.81%
Grado en Ingeniería Telemática,28.12%
Grado en Matemática Aplicada y Computación,38.11%`;

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
