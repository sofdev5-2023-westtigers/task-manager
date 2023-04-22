// @ts-nocheck
import { browser } from '$app/environment';
import { Registry } from '$lib/auth/Registry';
import type { Load } from '@sveltejs/kit';

export const load = () => {
	if (browser) {
		Registry.auth.inBrowserInit();
	}

	return {};
};
;null as any as Load;