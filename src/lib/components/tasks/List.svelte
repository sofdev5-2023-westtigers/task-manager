<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction";
  import {formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
	import CalendarTask from '../calendarTask/CalendarTask.svelte';
	import Header from '../header/Header.svelte';
  import {addNewTask, createTask, saveList} from './Tasks';
  
  export let name = '';
  export let inputValue = [];
  let user: User;
  let isMenuOpen = false;
  let taskList = [];

  function hideMenu() {
    isMenuOpen = false; // Cambia el estado de isMenuOpen a false cuando se hace clic en cualquier opción
  }

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
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

  <Header/>

  <div class=" top justify-center flex flex-wrap" style="padding-top: 100px;">
    <div style="margin-left:20px; margin-right: 20px ;min-width: 420px">
      <div class=" w-auto list bg-[#A9907E] rounded-[10PX] max-w-xl p-4 mb-4">
        <label class="title-List font-bold text-3xl" style="white-space: pre-line;">{name.replace(/(.{22})/g, "$&\n")}</label>
        <button class="btn text-xs" style="margin-left:40px" on:click={ (event) => addNewTask(event, name)}>Add New Task</button>
        <div class="dropdown dropdown-bottom mx-4">
          <label tabindex="0" class="btn m-1 text-xs" style="margin-top:-30px; width: 16%; min-width: 70px" on:click={() => { isMenuOpen = !isMenuOpen; }}>{isMenuOpen ? 'Close' : 'Options'}</label>
          <ul tabindex="0" class=" menu dropdown-content p-2 rounded-box w-52 bg-success" style={isMenuOpen ? 'display: block' : 'display: none'}>
            <li><a on:click={handleClick}>See Stadistics</a></li>
            <li><a href="/todo-lists">Return to Lists</a></li>
          </ul>
        </div>
        <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
        <button on:click={(event) =>saveList(event, user)} style="display: none;">Done</button>
        <ul class="ul-listTasks"></ul>
          <li class="li-newtask list-none">
            <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
            <div class="datepick-select" hidden>
              <DatePick/>
            </div>
            <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList, false, true)}>Add</button>
          <ul class="list-Task mt-2 list-none">
            {#each inputValue as task}
            {#if task}
              {#if !task.dates && !task.date}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
              {#if task.date}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} containsDate={true} dateValue={formatDate(task.date)} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
              {#if task.dates}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} containsDates={true} dateValue={task.dates.map(dateString => formatDate(dateString)).join("-")} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
            {/if}
            {/each}
          </ul>
        </li>
    </div> 
  </div>
  <div style="width: 50%; min-width:fit-content">
    <div class="calendarTaskComp" style="margin-right: 35px; margin-left: 35px; margin-top:3px; margin-bottom: 30px;">
      {#each inputValue as task}
      {#if inputValue[inputValue.length - 1]._id === task._id }
          <CalendarTask tasksEvents={tasksListEvents}/>
        {/if}
      {/each}
    </div>
  </div>
</div>