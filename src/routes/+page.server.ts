import { lists } from '$db/lists';

import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async function() {
	const data = await lists.find().toArray();

	return {
		lists: JSON.parse(JSON.stringify(data))
	}
}