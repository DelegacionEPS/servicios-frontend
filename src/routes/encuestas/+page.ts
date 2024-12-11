import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '33.80%';
const FHCD = '32.80%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,35.71%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,29.22%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,45.45%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,29.9%
Grado en Ciencia e Ingeniería de Datos,38.01%
Grado en Ciencias,5.00%
Grado en Ingeniería Aeroespacial,46.87%
Grado en Ingeniería Biomédica,33.89%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,41.3%
Grado en Ingeniería de la Energía,31.66%
Grado en Ingeniería de Sonido e Imagen,34.69%
Grado en Ingeniería Eléctrica,27.62%
Grado en Ingeniería Electrónica Industrial y Automática,36.53%
Grado en Ingeniería en Tecnologías de Telecomunicación,35.58%
Grado en Ingeniería en Tecnologías Industriales,30.64%
Grado en Ingeniería Física,53.85%
Grado en Ingeniería Informática - Leganés,36.12%
Grado en Ingeniería Informática - Colmenarejo,34.5%
Grado en Ingeniería Mecánica,31.87%
Grado en Ingeniería Robótica,44.8%
Grado en Ingeniería Telemática,35.87%
Grado en Matemática Aplicada y Computación,48.14%`;

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
