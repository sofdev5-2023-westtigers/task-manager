<script>
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import LandingPage from "./LandingPage.svelte";

	onMount(() => {
		Registry.auth.checkParams();
	});

	let login = () => {
		Registry.auth.login({ redirectUri: location.href });
	};

	let logout = () => {
		Registry.auth.logout();
	};
</script>

<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<LandingPage/>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
