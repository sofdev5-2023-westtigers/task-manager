<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
	import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions.ts';
  import {addNewEventTask, setTaskList, convertDatesFormat} from "$calendarTasks/CalendarTaskFunction.ts";
  export let name = '';
  export let inputValue = [];
  let user: User;
  let taskList = [];

  setTaskList(inputValue);

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
        addNewEventTask(inputValue1, date, date);
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1, containsDate : true ,dateValue : date },
        });
        body.append('date', date);
    }else if(showPickDates == true){
      let arraydate = convertDatesFormat(dates);
      addNewEventTask(inputValue1, arraydate[0], arraydate[1]);
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
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
  <li class="title-List font-bold text-2xl">{name}</li>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <ul class="ul-listTasks">
    <li class="li-newtask">
      <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
      <div class="datepick-select" hidden>
        <DatePick/>
      </div>
      <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={(event) => createTask(event)}>Add</button>
      <ul class="list-Task mt-2">
        {#each inputValue as task}
        {#if task}
        <div>
          <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
          <label class="label-task ml-2" for="task">{task.taskName} </label>
          {#if task.date}
            <i class="mi mi-calendar"><span class="u-sr-only">{task.date}</span></i>
          {/if}
          {#if task.dates}
            <i class="mi mi-calendar"><span class="u-sr-only">{task.dates}</span></i>
          {/if}
        </div>
        {/if}
        {/each}
      </ul>
    </li>
  </ul>
</div> 

<style>
  input:checked + label, input:checked + label + i {
      text-decoration: line-through;
  }
</style>