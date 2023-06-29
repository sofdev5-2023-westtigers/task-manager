<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
  import {addNewTask, createTask, saveList} from './Tasks'

  export let name = '';
  export let inputValue = [];
  let user: User;
  let taskList = [];
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
  <label class="title-List font-bold text-3xl" on:click={handleClick} style="white-space: pre-line;">{name.replace(/(.{1,36})/g, "$1\n")}</label>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask(event, name)}>Add task</button>
  <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
  <button on:click={saveList(event, user)} style="display: none;">Done</button>
  <ul class="ul-listTasks"></ul>
  <li class="li-newtask list-none">
    <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
    <div class="datepick-select" hidden>
      <DatePick/>
    </div>
    <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList, false, false)}>Add</button>
    <ul class="list-Task mt-2 list-none">
      {#each inputValue as task}
        {#if task}
          <div style="margin-bottom:2px;" class="list-item ">
            {#if JSON.parse(task.isCompleted)}
              <input class="checkbox check-button-task checkbox" type="checkbox" name="task"  on:change={saveTask(event, user)} checked>
            {:else}
              <input class="check-button-task checkbox" type="checkbox"  on:change={saveTask(event, user)} name="task">
            {/if}
            <label class="label-task ml-2 list-card-details"  for="task"  on:click={showTasks}>{task.taskName} </label>
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
  .list-Task {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .list-item {
    background-color: #fff;
    border: 3px solid #c4c3c3;
    border-radius: 30px;
    margin: 20px;
    padding: 6px 8px;
    display: flex;
    align-items: center;
  }

  .list-card-details {
    color: #675D50;
    font-size: 18px;
    line-height: 16px;
    margin-top: 4px;
    font-family: 'Canva Sans', sans-serif;
  }
  .checkbox{
    margin-right: 10px;
  }

</style>