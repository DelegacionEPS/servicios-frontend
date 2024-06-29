import type { PageServerLoad, Actions} from './$types';
import {getReservasNia, BASE_URL_API, TOKEN} from '$lib/api_taquillas';

export const load = (async (event) => {
    const fetchReservas = async (nia) => {
		const res = await fetch(`${BASE_URL_API}/api/getReservas/nia/${nia}${TOKEN}`);
		const data = await res.json();
		return data;
	};

	let session = await event.locals.auth();
	let nia = session?.user?.email?.split('@')[0];
	let reserva =  await fetchReservas(nia);
	if (reserva == null) {
		reserva = []
	}

	return {
		reservas: reserva,
	};
}) satisfies PageServerLoad;

export const actions = {
	busquedaNia: async ({ cookies, request }) => {
		const data = await request.formData();
		// -------- Aquí se llama a la función de la API que busca las taquillas asociadas a un NIA -------- 
		const nia = data.get('NIA_s');
		const result = getReservasNia(nia);
		return result;
	},
} satisfies Actions;