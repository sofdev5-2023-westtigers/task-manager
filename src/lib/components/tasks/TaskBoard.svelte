<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
	import {
		date,
		dates,
		showPickDate,
		showPickDates,
		setFalsePicks
	} from '$calendar/CalendarOptions';
	import { setTaskList } from '$calendarTasks/CalendarTaskFunction';
	import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from './TaskEdit';

	import DatePick from '$calendar/DatePick.svelte';
	import { addNewTask, createTask, saveList } from './Tasks';
	import TaskCard from './TaskCard.svelte';
	import { goto } from '$app/navigation';

	export let name = '';
	export let inputValue: any[] = [];
	let user: User;
	let taskList: any[] = [];

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

	function updateCalendar(event: any) {
		showCalendar(event);

		prevDate = date;
		prevDates = dates;
	}

	let isShowNew: boolean = false;

	function hiddenShowAddTask(event: any) {
		isShowNew = !isShowNew;
	}
</script>

<div class=" top justify-center flex flex-wrap" style="padding-top: 100px; padding-left: 100px;">
	<div data-testid="content-element" class="bg-white rounded px-2 py-2">
		<!-- board category header -->
		<label class="title-List bg-red-100 rounded font-bold text-2xl" on:click={handleClick}
			>{name}</label
		>
		<!-- board card -->
		<ul class="list-Task mt-2 list-none">
			{#each inputValue as task}
				{#if task}
					{#if !task.dates && !task.date}
						<TaskCard name={task.taskName} isCompleted={task.isCompleted} />
					{/if}
					{#if task.date}
						<TaskCard
							name={task.taskName}
							containsDate={true}
							dateValue={formatDate(task.date)}
							isCompleted={task.isCompleted}
						/>
					{/if}
					{#if task.dates}
						<TaskCard
							name={task.taskName}
							containsDates={true}
							isCompleted={task.isCompleted}
							dateValue={task.dates.map((dateString) => formatDate(dateString)).join('-')}
						/>
					{/if}
				{/if}
			{/each}
		</ul>
		<div class="flex flex-col mt-2 px-1">
			<button
				class="button-AddTask text-gray-400 px-1 py-1 mt-2 rounded-md text-sm"
				type="button"
				on:click={(addNewTask(event, name), hiddenShowAddTask(event))}
			>
				+ New</button
			>
			{#if isShowNew}
				<div class="flex-col">
					<input
						data-testid="input-name-task"
						class="input-nameTask text-black border-gray-300 bg-gray-100 rounded-[20PX] px-2 py-1 mt-2 text-sm"
						type="text"
						name="item1-textfield"
						placeholder="Name Task...."
					/>
					<DatePick />
					<button
						data-testid="button-add"
						class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm"
						type="button"
						on:click={createTask(
							event,
							user,
							name,
							date,
							dates,
							showPickDate,
							showPickDates,
							setFalsePicks,
							taskList,
							true
						), hiddenShowAddTask(event)}>Add</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
