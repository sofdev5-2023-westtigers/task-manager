<script lang="ts">
    import List from "$lib/components/tasks/List.svelte";
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import { setTaskList } from '$calendarTasks/CalendarTaskFunction';
	import type { User } from '$lib/auth/User';

    export let data;
	let user: User;
	let groupedTasks: any;

onMount(async() => {
	Registry.auth.checkParams();
	Registry.auth.getUser().subscribe((data: User) => {
		user = data;
		fetchTasks(user.userId?.toString());
	});
});

async function fetchTasks(userId : string | undefined) {
	const res = await fetch(`/api/tasks/getTasks?userId=${userId}&listName=${data.id}`);
	groupedTasks = await res.json();
	setTaskList(groupedTasks);
}

</script>

<AuthGuard manual={true}>
	<div slot="authed">
		<List name={data.id} inputValue={groupedTasks}/>
	</div>
</AuthGuard>