import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '19.50%';
const FHCD = '17.49%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,22.19%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,14.72%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,30.3%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,20.05%
Grado en Ciencia e Ingeniería de Datos,15.58%
Grado en Ciencias,37.5%
Grado en Ingeniería Aeroespacial,24.78%
Grado en Ingeniería Biomédica,16.42%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,29.41%
Grado en Ingeniería de la Energía,14.7%
Grado en Ingeniería de Sonido e Imagen,15.87%
Grado en Ingeniería Eléctrica,16.59%
Grado en Ingeniería Electrónica Industrial y Automática,21.92%
Grado en Ingeniería en Tecnologías de Telecomunicación,26.37%
Grado en Ingeniería en Tecnologías Industriales,18.62%
Grado en Ingeniería Física,36.95%
Grado en Ingeniería Informática - Leganés,26.02%
Grado en Ingeniería Informática - Colmenarejo,27.85%
Grado en Ingeniería Mecánica,22.99%
Grado en Ingeniería Robótica,27.42%
Grado en Ingeniería Telemática,17.02%
Grado en Matemática Aplicada y Computación,23.64%`;

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
