<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import {setTaskList } from "$calendarTasks/CalendarTaskFunction";
  import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
  import {addNewTask, createTask, saveList} from './Tasks'

  export let name = '';
  export let inputValue = [];
  let user: User;
  let taskList = [];
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

  function updateCalendar(event) {
    showCalendar(event);

    prevDate = date;
    prevDates = dates;
  }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div class="list bg-[#A9907E] rounded-[10PX] p-4 mb-4">
  <label class="title-List font-bold text-2xl" on:click={handleClick}>{name}</label>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask(event, name)}>Add task</button>
  <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
  <button on:click={saveList(event, user)} style="display: none;">Done</button>
  <ul class="ul-listTasks"></ul>
  <li class="li-newtask list-none">
    <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
    <div class="datepick-select" hidden>
      <DatePick/>
    </div>
    <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList)}>Add</button>
    <ul class="list-Task mt-2 list-none">
      {#each inputValue as task}
        {#if task}
          <div>
            {#if JSON.parse(task.isCompleted)}
              <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task" checked>
            {:else}
              <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
            {/if}
            <label class="label-task ml-2"  for="task"  on:click={showTasks}>{task.taskName} </label>
            <input class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
            <button class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={saveTask(event, user)} style="display: none;">Done</button>
            {#if task.date}

              <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{formatDate(task.date)}</span></i>
              <button  class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
            {/if}
            {#if task.dates}
              <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{task.dates.map(dateString => formatDate(dateString)).join("-")}</span></i>
              <button  class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
            {/if}
          </div>
        {/if}
      {/each}
    </ul>
  </li>
</div>

<style>
  input:checked + label, input:checked + label + i {
      text-decoration: line-through;
  }
</style>