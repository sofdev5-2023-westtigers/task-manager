<script lang="ts">
    import List from "$lib/components/tasks/List.svelte";
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import CalendarTask from "$calendarTasks/CalendarTask.svelte";
	import { tasksListEvents } from '$calendarTasks/CalendarTaskFunction';
	import {setTaskList } from '$calendarTasks/CalendarTaskFunction';
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
	console.log(groupedTasks);
	console.log(userId);
	console.log(data.id);
	console.log(tasksListEvents);
}


</script>

<AuthGuard manual={true}>
	<div slot="authed">
		<List name={data.id} inputValue={groupedTasks}/>
		<CalendarTask tasksEvents={tasksListEvents}/>
	</div>
</AuthGuard>