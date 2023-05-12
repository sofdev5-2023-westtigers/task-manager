<script lang="ts">
    import List from "$lib/components/tasks/List.svelte";
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import type { User } from '$lib/auth/User';

    export let data;
	let user: User;
	let userId: string | undefined;

	onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
      		user = data;
    	});
		Registry.auth.checkParams();
		userId = user.userId?.toString();
		fetchTasks();
	});

	let groupedTasks: any;
	async function fetchTasks() {
  		const res = await fetch(`/api/tasks/getTasks?userId=${userId}&listName=${data.id}`);
		groupedTasks = await res.json();
		console.log(groupedTasks);
		console.log(userId);
		console.log(data.id);
	}


</script>

<AuthGuard manual={true}>
	<div slot="authed" let:user>
		<List name={data.id} inputValue={groupedTasks}/>
	</div>
</AuthGuard>