import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

// Page sizes 

export const load = (({params, data}) => {
	if (!['1', '2', '3'].includes(params.puesto)) {
		error(404, `Esta página no se ha podido encontrar el puesto: "${params.puesto}"`);
	}
	return {
		puesto: data.puesto,
		reservas: data.reservas,	
	};
}) satisfies PageLoad;

export function _handleResult(result: any) {
	const code = result.status;
	const body = result.body;

	if (code === 200) {
		alert('Osciloscopio reservado correctamente');
	} else {
		alert('Error al reservar el osciloscopio');
	}
}