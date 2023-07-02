<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import DatePick from '$calendar/DatePick.svelte';
	import type { User } from '$lib/auth/User';
	import NewTask from './NewTask.svelte';
	import {
		date,
		dates,
		showPickDate,
		showPickDates,
		setFalsePicks
	} from '$calendar/CalendarOptions';
	import { tasksListEvents } from '$calendarTasks/CalendarTaskFunction';
	import { formatDate } from './TaskEdit';
	import { goto } from '$app/navigation';
	import CalendarTask from '../calendarTask/CalendarTask.svelte';
	import Header from '../header/Header.svelte';
	import { addNewTask, createTask, saveList } from './Tasks';
    import ModalAddMembers from './ModalAddMembers.svelte';

	export let name = '';
	export let inputValue = [];
	let user: User;
	let isMenuOpen = false;
	let taskList = [];
	let modalAddMembersList = false;

	onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

	const handleClick = () => {
		const url = `/todo-lists/${name}/stadisticsList`;
		goto(url, { target: '_blank' });
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>

<Header />

<div class=" top justify-center flex flex-wrap" style="padding-top: 100px;">
	<div style="display: inline-flex;">
		<a href="/todo-lists">
			<div class="back-list-button">
				<img src="../src/resources/leftArrow.png" alt="Back" />
			</div>
		</a>
		<div class="container-list max-w-xl p-4 mb-4">
			<label class="font-bold text-3xl title-info-list">{name.replace(/(.{22})/g, '$&\n')}</label>
			<div style="display: inline-flex; justify-content: center;">
				<!-- a -->
				<!-- {#if true} -->
				<div>
					<li class="li-newtask list-none">
						<input
							class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm"
							hidden
							type="text"
							name="item1-textfield"
							placeholder="Name Task...."
						/>
						<div class="datepick-select" hidden>
							<DatePick />
						</div>
						<button
							class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm"
							hidden
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
								false,
								true
							)}>Add</button
						>
					</li>
				</div>
				<!-- {/if} -->
				<!-- a -->
				<button class="btn-customPlus" on:click={() => modalAddMembersList = true}>+</button>
				<ModalAddMembers
				htmlMenssage = {"in the task manager app you were added to the list " + name}
				textMenssage = {"Added to a list!!"}
				subjectMenssage = {"added to a list"}
				titleModal = {"List"}
				bind:modalAddMembers = {modalAddMembersList}
				/>

				<button class="btn-custom" style="" on:click={(event) => addNewTask(event, name)}
					>Add New Task</button
				>
				<button class="btn-custom" style="" on:click={handleClick}>See Stadistics</button>
			</div>
			<input
				class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm"
				type="text"
				style="display: none;"
			/>
				<!-- task -->
				<ul class="list-Task mt-2 list-none">
					{#each inputValue as task}
						{#if task}
							{#if !task.dates && !task.date}
								<NewTask
									inputValue={task.taskName}
									nameList={task.listName}
									isChecked={JSON.parse(task.isCompleted)}
									timeChronometer={task.timeChronometer}
									isTimeChronometer={true}
								/>
							{/if}
							{#if task.date}
								<NewTask
									inputValue={task.taskName}
									nameList={task.listName}
									isChecked={JSON.parse(task.isCompleted)}
									containsDate={true}
									dateValue={formatDate(task.date)}
									timeChronometer={task.timeChronometer}
									isTimeChronometer={true}
								/>
							{/if}
							{#if task.dates}
								<NewTask
									inputValue={task.taskName}
									nameList={task.listName}
									isChecked={JSON.parse(task.isCompleted)}
									containsDates={true}
									dateValue={task.dates.map((dateString) => formatDate(dateString)).join('-')}
									timeChronometer={task.timeChronometer}
									isTimeChronometer={true}
								/>
							{/if}
						{/if}
					{/each}
				</ul>
				<!-- task -->
		</div>
	</div>
	<div style="width: 50%; min-width:fit-content">
		<div
			class="calendarTaskComp"
			style="margin-right: 35px; margin-left: 35px; margin-top:3px; margin-bottom: 30px;"
		>
			{#each inputValue as task}
				{#if inputValue[inputValue.length - 1]._id === task._id}
					<CalendarTask tasksEvents={tasksListEvents} />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.title-info-list {
		white-space: pre-line;
		width: 100%;
		float: left;
		clear: left;
		color: white;
		margin-bottom: 10px;
	}

	.btn-customPlus{
		font-family: Roboto, sans-serif;
		font-weight: 0;
		font-size: 14px;
		color: #fff;
		background-color: #625341;
		padding: 10px 18px;
		border: solid #ffffff 2px;
		box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
		border-radius: 9px;
		transition: 500ms;
		transform: translateY(0);
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		margin-left: 70px;
		margin-right: 15px;

    height: 30px;
    max-width: 80px;
    max-height: 30px;
	}

	.btn-custom {
		font-family: Roboto, sans-serif;
		font-weight: 0;
		font-size: 14px;
		color: #fff;
		background-color: #625341;
		padding: 10px 18px;
		border: solid #ffffff 2px;
		box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
		border-radius: 9px;
		transition: 500ms;
		transform: translateY(0);
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		margin-right: 15px;
    width: 130px;
    height: 30px;
    max-width: 130px;
    max-height: 30px;
	}

	.btn-custom:hover {
		transition: 500ms;
		transform: translateY(-0px);
		background-color: #8e7657;
		color: #ffffff;
		border: solid #ffffff 2px;
		border-radius: 9px;
    width: 130px;
    height: 30px;
    max-width: 130px;
    max-height: 30px;
	}

	.back-list-button {
		display: flex;
		justify-content: center;
		align-items: top;
		background-color: #625341;
		width: 60px;
		height: 60px;
		transition: 500ms;
		border: solid #ffffff 2px;
		border-radius: 10px;
		padding: 6px;
	}

	.back-list-button:hover {
		transition: 500ms;
		transform: translateY(-0px);
		background-color: #8e7657;
		color: #ffffff;
		border: solid #ffffff 2px;
		border-radius: 9px;
	}

	.container-list {
		background-color: #a9907e;
		border-radius: 15px;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>
