<script lang="ts">
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
    import List from "$lib/components/tasks/List.svelte";
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
    export let data;
	onMount(() => {
		Registry.auth.checkParams();
	});
</script>

<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<List name={data.id}/>
	</div>
</AuthGuard>