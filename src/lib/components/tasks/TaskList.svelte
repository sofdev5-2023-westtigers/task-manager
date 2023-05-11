<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions.ts';
  import {setTaskList } from "$calendarTasks/CalendarTaskFunction.ts";
  import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from "./TaskEdit";
  
  export let name = '';
  export let inputValue = [];
  let user: User;
  let taskList = [];
  $: setTaskList(inputValue);
  export let inputValueListName = '';

  let prevDate;
  let prevDates;
  
  async function addNewTask(event) {
    if (name) {
      const body = new FormData();
      body.append('listName', name);
      const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
      inputNameTask?.removeAttribute('hidden');
      const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
      inputNameTask1?.removeAttribute('hidden');
      const datepickTask = event.target.parentNode.querySelector('.datepick-select');
      datepickTask?.removeAttribute('hidden');
    }
  }

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

  async function createTask(event) {
      const inputElement = event.target.parentNode.querySelector('.input-nameTask');

      const inputValue1 = inputElement.value;

      let newTask = null;

      const body = new FormData();
      body.append('userId',user.userId.toString());
      body.append('taskName', inputValue1);
      body.append('listName', name);
      body.append('isCompleted', false.toString());

      if(showPickDate == true){
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1, containsDate : true ,dateValue : date },
        });
        body.append('date', date);
    }else if(showPickDates == true){
      newTask = new NewTask({
      target: event.target.parentNode.querySelector('.list-Task'),
      props: { inputValue : inputValue1, containsDate : true , dateValue : dates },
      });
      body.append('dates', dates);
    }else{
      newTask = new NewTask({
      target: event.target.parentNode.querySelector('.list-Task'),
      props: { inputValue : inputValue1},
      });
    }
    setFalsePicks();
    await fetch('/api/tasks/addTask', {
        method: 'POST',body
    });

    taskList = [...taskList, newTask];
    inputElement.value = '';

    const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
    inputNameTask?.setAttribute('hidden', true);
    const datepickTask = event.target.parentNode.querySelector('.datepick-select');
    datepickTask?.setAttribute('hidden', true);
    const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
    inputNameTask1?.setAttribute('hidden', true);
  }

    function show() {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        inputs[0].value = labels[0].textContent
        buttons[1].style.display = "inline";
        inputs[0].style.display = "inline";
    }

    async function saveList(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldList = labels[0].textContent;

        if (inputs[0].value == "") {
            inputs[0].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[0].value;
        }
        
        
        inputs[0].style.display = "none";
        buttons[1].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.listName-modified');
        const inputValueListName = inputElement.value;

        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('listNameOld', oldList);
        body.append('listName', inputValueListName);
        const result = await fetch('/api/tasks/updateList', {
        method: 'PUT', body
        });
        const task = await result.json();
    }

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
  <label class="title-List font-bold text-2xl" on:click={show}>{name}</label>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
  <button on:click={saveList} style="display: none;">Done</button>
  <ul class="ul-listTasks"></ul>
    <li class="li-newtask list-none">
      <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
      <div class="datepick-select" hidden>
        <DatePick/>
      </div>
      <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={(event) => createTask(event)}>Add</button>
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