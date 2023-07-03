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
	export let isToggled:boolean;
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

	function hiddenShowAddTask() {
		isShowNew = !isShowNew;
	}
</script>

<div data-testid="content-board" class="rounded-md" style=" width: 250px; border: 3px solid #D9D9D9; background-color: #F2F2F2;">
	<div data-testid="content-element" class="rounded-md p-4 justify-start">
		<!-- board category header -->
		<label class=" btn-ghost title-List rounded font-bold text-2xl p-2" on:click={handleClick} style="white-space: pre-line;">{name.replace(/(.{26})/g, "$&\n")}</label>
		<!-- board card -->
		<ul class="list-Task mt-2 list-none">
			{#each inputValue as task}
				{#if task}
					{#if !task.dates && !task.date}
						<TaskCard name={task.taskName} isCompleted={task.isCompleted} listName={name} />
					{/if}
					{#if task.date}
						<TaskCard
							name={task.taskName}
							containsDate={true}
							dateValue={formatDate(task.date)}
							isCompleted={task.isCompleted}
							listName={name}
						/>
					{/if}
					{#if task.dates}
						<TaskCard
							name={task.taskName}
							containsDates={true}
							isCompleted={task.isCompleted}
							dateValue={task.dates.map((dateString) => formatDate(dateString)).join('-')}
							listName={name}
						/>
					{/if}
				{/if}
			{/each}
		</ul>
	</div>
	<div class="flex flex-col justify-center m-2 m-1">
		{#if !isShowNew}
			<button
				class=" btn-ghost button-AddTask px-1 py-1 mt-2 rounded-md text-sm"
				type="button"
				on:click={(addNewTask(event, name), hiddenShowAddTask)}>
				+ New
			</button>
		{/if}
		{#if isShowNew}
			<div class="flex-col p-2">
				<input
					data-testid="input-name-task"
					class="input-nameTask text-black border-gray-300 bg-gray-100 rounded-[20PX] px-2 py-1 mt-2 text-sm"
					type="text"
					name="item1-textfield"
					placeholder="Name Task...."
				/>
				<DatePick />
				<div class=" pt-2">
					<button
					data-testid="button-add"
					class="button-add bg-[#ABC4AA] text-black rounded-md"
					type="button"
					style="height: 25px; width: 50px; border: 3px solid #92AD91;"
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
						isToggled,
						true
					), hiddenShowAddTask()}>ADD</button
					>
					<button class="rounded-md " style="background-color: #EDB491; height: 25px; width: 80px; border: 3px solid #BB9075;" on:click={hiddenShowAddTask}>CANCEL</button>
				</div>
				
			</div>
		{/if}
	</div>
</div>
