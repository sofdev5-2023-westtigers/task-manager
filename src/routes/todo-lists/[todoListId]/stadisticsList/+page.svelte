<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';
	import type { User } from '$lib/auth/User';
	import Stadistic from '$lib/components/stadistics/Stadistic.svelte';
	import {trasformDataDonutChart, trasformDataPieChart, trasformDataBarChart } from '$stadistics/transformData';

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
		trasformDataPieChart(groupedTasks);
		trasformDataDonutChart(groupedTasks);
		trasformDataBarChart(groupedTasks);
	}

</script>

<AuthGuard manual={true}>
	<div slot="authed">
		<Stadistic nameList={data.id} tasks={groupedTasks}/>
	</div>
</AuthGuard>