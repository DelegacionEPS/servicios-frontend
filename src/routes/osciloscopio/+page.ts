import type { PageLoad } from './$types';

export const load = (({params, data}) => {
	return {
        osciloscopio: data.osciloscopio,
	};
}) satisfies PageLoad;