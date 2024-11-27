import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '6.36%';
const FHCD = '4.99%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,5.06%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,0.87%
Doble Grado en Ingeniería Física e Ingeniería en Tecnologías Industriales,0%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,2.90%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,12.12%
Grado en Ciencia e Ingeniería de Datos,3.55%
Grado en Ciencias,12.50%
Grado en Ingeniería Aeroespacial,5.97%
Grado en Ingeniería Biomédica,1.96%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,6.27%
Grado en Ingeniería de la Energía,3.31%
Grado en Ingeniería de Sonido e Imagen,5.35%
Grado en Ingeniería Eléctrica,2.90%
Grado en Ingeniería Electrónica Industrial y Automática,5.09%
Grado en Ingeniería en Tecnologías de Telecomunicación,3.21%
Grado en Ingeniería en Tecnologías Industriales,3.94%
Grado en Ingeniería Física,11.01%
Grado en Ingeniería Informática - Leganés,9.08%
Grado en Ingeniería Informática - Colmenarejo,12.55%
Grado en Ingeniería Mecánica,5.26%
Grado en Ingeniería Robótica,0.18%
Grado en Ingeniería Telemática,1.82%
Grado en Matemática Aplicada y Computación,3.15%`;

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
