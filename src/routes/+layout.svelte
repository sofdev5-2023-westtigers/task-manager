<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';

	onMount(() => {
		Registry.auth.login({ redirectUri: location.href });
	});
</script>

<main>
	<slot />
</main>
