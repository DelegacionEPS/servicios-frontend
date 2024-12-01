import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '12.94%';
const FHCD = '9.57%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,13.65%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,09.09%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,21.21%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,13.09%
Grado en Ciencia e Ingeniería de Datos,08.14%
Grado en Ciencias,25.00%
Grado en Ingeniería Aeroespacial,15.34%
Grado en Ingeniería Biomédica,09.26%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,12.28%
Grado en Ingeniería de la Energía,10.46%
Grado en Ingeniería de Sonido e Imagen,09.41%
Grado en Ingeniería Eléctrica,10.58%
Grado en Ingeniería Electrónica Industrial y Automática,13.66%
Grado en Ingeniería en Tecnologías de Telecomunicación,14.85%
Grado en Ingeniería en Tecnologías Industriales,12.98%
Grado en Ingeniería Física,26.09%
Grado en Ingeniería Informática - Leganés,18.13%
Grado en Ingeniería Informática - Colmenarejo,17.69%
Grado en Ingeniería Mecánica,14.35%
Grado en Ingeniería Robótica,07.53%
Grado en Ingeniería Telemática,07.75%
Grado en Matemática Aplicada y Computación,10.6%`;

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
