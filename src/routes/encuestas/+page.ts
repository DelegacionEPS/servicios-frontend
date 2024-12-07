import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '24.43%';
const FHCD = '22.15%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,28.2%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,24.03%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,30.3%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,24.91%
Grado en Ciencia e Ingeniería de Datos,29.35%
Grado en Ciencias,37.5%
Grado en Ingeniería Aeroespacial,42.21%
Grado en Ingeniería Biomédica,19.28%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,35.04%
Grado en Ingeniería de la Energía,24.11%
Grado en Ingeniería de Sonido e Imagen,21.4%
Grado en Ingeniería Eléctrica,20.71%
Grado en Ingeniería Electrónica Industrial y Automática,27.00%
Grado en Ingeniería en Tecnologías de Telecomunicación,30.65%
Grado en Ingeniería en Tecnologías Industriales,22.71%
Grado en Ingeniería Física,42.38%
Grado en Ingeniería Informática - Leganés,29.91%
Grado en Ingeniería Informática - Colmenarejo,30.11%
Grado en Ingeniería Mecánica,26.97%
Grado en Ingeniería Robótica,36.74%
Grado en Ingeniería Telemática,27.05%
Grado en Matemática Aplicada y Computación,35.53%`;

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
