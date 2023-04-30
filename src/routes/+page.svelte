<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import ListOfLists from "$lib/components/tasks/ListOfLists.svelte";
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
	  <button on:click={logout}>Logout</button>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
