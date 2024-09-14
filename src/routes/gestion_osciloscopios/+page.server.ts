import type { PageServerLoad, Actions} from './$types';
import {getReservasNia, getReservasTaquilla, reservaTaquilla, reservaTaquillaAsociacion, marcarRota, arreglarTaquilla, BASE_URL_API, TOKEN} from '$lib/api_taquillas';

export const load = (async () => {
    const fetchAuthorizedEmails = async (rango:String) => {
		const res = await fetch(`${BASE_URL_API}/api/authorizedEmails/${rango}${TOKEN}`);
		const data = await res.json();
		return data;
	};

	const fetchTablaPabloOsciloscopios = async () => {
		const res = await fetch(`${BASE_URL_API}/api/tablaPabloOsciloscopios${TOKEN}`);
		const data = await res.json();
		return data;
	};

	let emailsDespacho = await fetchAuthorizedEmails('atencion');
	if (emailsDespacho === null) {
		emailsDespacho = [];
	}
	let emailsEscuela = await fetchAuthorizedEmails('escuela');
	if (emailsEscuela === null) {
		emailsEscuela = [];
	}
	emailsDespacho = emailsDespacho.concat(emailsEscuela);
	// remove null values
	emailsDespacho = emailsDespacho.filter((email: String) => email !== null);

    return {
        authorizedEmailsTaquillasEscuela: emailsEscuela,
		authorizedEmailsTaquillasDespacho: emailsDespacho,
		tablaPabloOsciloscopios: await fetchTablaPabloOsciloscopios(),
    };
}) satisfies PageServerLoad;


export const actions = {

} satisfies Actions;