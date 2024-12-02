import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '12.94%';
const FHCD = '9.57%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,14.6%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,09.74%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,21.21%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,13.09%
Grado en Ciencia e Ingeniería de Datos,08.92%
Grado en Ciencias,25.00%
Grado en Ingeniería Aeroespacial,17.49%
Grado en Ingeniería Biomédica,09.49%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,13.55%
Grado en Ingeniería de la Energía,11.13%
Grado en Ingeniería de Sonido e Imagen,09.41%
Grado en Ingeniería Eléctrica,11.14%
Grado en Ingeniería Electrónica Industrial y Automática,14.74%
Grado en Ingeniería en Tecnologías de Telecomunicación,15.8%
Grado en Ingeniería en Tecnologías Industriales,13.67%
Grado en Ingeniería Física,26.55%
Grado en Ingeniería Informática - Leganés,19.48%
Grado en Ingeniería Informática - Colmenarejo,17.69%
Grado en Ingeniería Mecánica,15.34%
Grado en Ingeniería Robótica,10.75%
Grado en Ingeniería Telemática,08.05%
Grado en Matemática Aplicada y Computación,11.6%`;

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
