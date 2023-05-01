<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import LandingPage from "./LandingPage.svelte";

	onMount(() => {
		Registry.auth.checkParams();
		Registry.auth.login({ redirectUri: location.href });
	});
</script>

<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<LandingPage/>
	</div>
</AuthGuard>
