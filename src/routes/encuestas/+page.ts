import type { PageLoad } from './$types';
import Papa from 'papaparse';

const FCSJ = '11.17%';
const FHCD = '8.53%';

export const load = (async () => {
	return {};
}) satisfies PageLoad;

let csv_data = `GRADO,P
ESCUELA POLITÉCNICA SUPERIOR,9.6%
Doble Grado Ciencia e Ingeniería de Datos - Ingeniería en Tecnologías de Telecomunicación,6.06%
Doble Grado en Ingeniería Física e Ingeniería en Tecnologías Industriales,0%
Doble Grado en Ingeniería Informática y Administración de Empresas - Leganés,9.73%
Doble Grado en Ingeniería Informática y Administración de Empresas - Colmenarejo,18.18%
Grado en Ciencia e Ingeniería de Datos,5.19%
Grado en Ciencias,25.00%
Grado en Ingeniería Aeroespacial,8.18%
Grado en Ingeniería Biomédica,5.65%
Grado en Ingeniería de Comunicaciones Móviles y Espaciales,8.44%
Grado en Ingeniería de la Energía,4.64%
Grado en Ingeniería de Sonido e Imagen,7.01%
Grado en Ingeniería Eléctrica,8.02%
Grado en Ingeniería Electrónica Industrial y Automática,9.14%
Grado en Ingeniería en Tecnologías de Telecomunicación,9.57%
Grado en Ingeniería en Tecnologías Industriales,10.06%
Grado en Ingeniería Física,22.93%
Grado en Ingeniería Informática - Leganés,14.27%
Grado en Ingeniería Informática - Colmenarejo,17.31%
Grado en Ingeniería Mecánica,9.06%
Grado en Ingeniería Robótica,2.51%
Grado en Ingeniería Telemática,4.71%
Grado en Matemática Aplicada y Computación,7.74%`;

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
