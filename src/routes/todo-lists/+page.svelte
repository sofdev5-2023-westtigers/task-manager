<script lang="ts">
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
    import ListOfLists from "$lib/components/tasks/ListOfLists.svelte";
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';

	onMount(() => {
		Registry.auth.checkParams();
	});
</script>

<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<ListOfLists />
	</div>
</AuthGuard>