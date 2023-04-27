<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import ListOfLists from "$lib/components/tasks/ListOfLists.svelte";

	import type { PageData } from "./$types";

  	export let data: PageData;
  	$: ({ lists } = data);

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

<h1>Main page</h1>
<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<ListOfLists/>
		<div>
			{#each lists as list}
            	{list.taskName}
        	{/each}
		</div>
		
		<button on:click={logout}>Logout</button>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
