<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
	import NewTask from './NewTask.svelte';
	import {date,dates,showPickDate,showPickDates,setFalsePicks} from '$calendar/CalendarOptions';
	import { setTaskList } from '$calendarTasks/CalendarTaskFunction';
	import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from './TaskEdit';
	import { goto } from '$app/navigation';

	export let name = '';
	export let inputValue: any[] = [];
	let user: User;
	let taskList: any[] = [];
	$: setTaskList(inputValue);
	export let inputValueListName = '';

	let prevDate;
	let prevDates;

	onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

	const handleClick = () => {
		const url = `/todo-lists/${name}`;
		goto(url, { target: '_blank' });
	};

	function updateCalendar(event : any) {
		showCalendar(event);

		prevDate = date;
		prevDates = dates;
	}
</script>

<!-- To-do -->
<div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
	<div class="bg-white rounded px-2 py-2">
		<!-- board category header -->
		<div class="flex flex-row justify-between items-center mb-2 mx-1">
			<div class="flex items-center">
				<label class="title-List bg-red-100 rounded font-bold text-2xl" on:click={handleClick}>{name}</label>
			</div>
			<div class="flex items-center text-gray-300">
				<p class="mr-2 text-2xl">---</p>
				<p class="text-2xl">+</p>
			</div>
		</div>
		<!-- board card -->
		{#each inputValue as task}
			<div class="grid grid-rows-1 gap-2">
				<div class="p-2 rounded shadow-sm border-gray-100 border-2">
					<div class="form-control">
						<label class="cursor-pointer label">
							<span class="label-text">{task.taskName}</span>

							{#if JSON.parse(task.isCompleted)}
								<input class="checkbox checkbox-accent" type="checkbox" name="task" checked />
							{:else}
								<input class="checkbox checkbox-accent" type="checkbox" name="task" />
							{/if}
						</label>
					</div>

					{#if task.date}
						<i class="mi mi-calendar"
							><span class="u-sr-only" on:click={(event) => updateCalendar(event)}
								>{formatDate(task.date)}</span
							></i
						>
						<button
							class="buttonDoneDate bg-[#c4bcbc] text-gray-600 px-1 py-1 rounded-md text-sm"
							name="save"
							type="button"
							on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)}
							hidden>Save</button
						>
					{/if}
					{#if task.dates}
						<i class="mi mi-calendar"
							><span class="u-sr-only" on:click={(event) => updateCalendar(event)}
								>{task.dates.map((dateString) => formatDate(dateString)).join('-')}</span
							></i
						>
						<button
							class="buttonDoneDates bg-[#c4bcbc] text-gray-600 px-1 py-1 rounded-md text-sm"
							name="save"
							type="button"
							on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)}
							hidden>Save</button
						>
					{/if}
				</div>
			</div>
		{/each}
		<div class="flex flex-row items-center text-gray-300 mt-2 px-1">
			<p class="rounded mr-2 text-2xl">+</p>
			<p class="pt-1 rounded text-sm">New</p>
		</div>
	</div>
</div>
