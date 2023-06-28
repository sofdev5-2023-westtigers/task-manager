<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import type { User } from '$lib/auth/User';
  import Cronometer from "../cronometer/Cronometer.svelte";
  import {date, dates, showPickDate, showPickDates} from '$calendar/CalendarOptions.ts';
  import {saveTask} from "./TaskEdit";
  import DatePick from "../calendar/DatePick.svelte";

  export let inputValue = '';
  export let nameList = '';
  export let containsDate = false;
  export let containsDates = false;
  export let dateValue = '';
  export let isTimeChronometer = false;
  export let timeChronometer : number = 0;
  export let isChecked = false;

  let user: User;
  let prevDate;
  let prevDates;

  async function save(event) {
      try {
          const parent = this.parentElement;
          const inputs = parent.querySelectorAll('input');
          const labels = parent.querySelectorAll('label');
          const buttons = parent.querySelectorAll('button');
          const oldValue = labels[0].textContent;
          let oldChecked = true;
          if (inputs[1].value == "") {
              inputs[1].value = labels[0].textContent;
          } else {
              labels[0].textContent = inputs[1].value;
          }

          buttons[0].style.display = "none";
          inputs[1].style.display = "none";
          const inputElement = event.target.parentNode.querySelector('.task-modified');
          const inputValue = inputElement.value;
          const checkbox = event.target.parentNode.querySelector('.checkbox-task');
          const isChecked = checkbox.checked;
          if (!isChecked) {
              console.log('isChecked ', checkbox.checked);
              oldChecked = false;
          }
          const body = new FormData();
          body.append('userId', user.userId.toString());
          body.append('taskNameOld', oldValue);
          body.append('taskName', inputValue);
          body.append('isCompletedOld', oldChecked.toString());
          body.append('isCompleted', isChecked.toString());
          const result = await fetch('/api/tasks/updateTasks', {
              method: 'PUT', body
          });
          const task = await result.json();
          console.log(task);
      } catch (error) {
          console.log("error was found");
          // Expected output: ReferenceError: nonExistentFunction is not defined
          // (Note: the exact output may be browser-dependent)
      }
  }
  onMount(() => {
    Registry.auth.getUser().subscribe((data: User) => {
        user = data;
    });
  });

  function show() {
      const parent = this.parentElement;
      const inputs = parent.querySelectorAll('input');
      const labels = parent.querySelectorAll('label');
      const buttons = parent.querySelectorAll('button');
      inputs[1].value = labels[0].textContent
      buttons[0].style.display = "inline";
      inputs[1].style.display = "inline";
  }

  async function saveCalendar(event) {
    let oldDateElem = event.target.parentNode.querySelector('span');
    let oldDate = oldDateElem.textContent;
    const body = new FormData();

    body.append('userId', user.userId.toString());

    if (date !== prevDate && dates === prevDates) {
      body.append('date', date);
      body.append('dates', '');
      oldDateElem.textContent = date;
    } else if (date === prevDate && dates !== prevDates) {
      body.append('date', '');
      body.append('dates', String(dates));
      oldDateElem.textContent = String(dates);
    }
    
    if (!oldDate.includes("-")) {
      body.append('oldDate', oldDate);
      body.append('oldDates', '');
    } else {
      body.append('oldDate', '');       
      body.append('oldDates', oldDate);
    }

    body.append('modifyDate', 'true');

    const result = await fetch('/api/tasks/updateTasks', {
      method: 'PUT', body
    });

  const datepickTask = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.datepick-select');
  datepickTask?.setAttribute('hidden', true);
  const saveButton = event.target;
  saveButton?.setAttribute('hidden', true);
  }

  function showCalendar(event) {
    const datepickTask = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.datepick-select');
    datepickTask?.removeAttribute('hidden');
    const saveButton = event.target.parentNode.parentNode.querySelector('[name="save"]');
    saveButton?.removeAttribute('hidden');

    prevDate = date;
    prevDates = dates;
  }
</script>

<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div class=" m-4">
    {#if isChecked}
        <input class="checkbox form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task"  on:change={saveTask(event, user)} checked>
    {:else}
        <input class="checkbox form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox"  on:change={saveTask(event, user)} name="task">
    {/if}
  <label data-testid="label-name" class="label-task ml-2 text-xl" for="task" on:click={show}>{inputValue}</label>
  <input data-testid="input-name" class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm"type="text" style="display: none;">
  <button data-testid="button-name" class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={saveTask(event, user)} style="display: none;">Done</button>
  {#if showPickDate || containsDate}
      <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDate? dateValue : date}</span></i>
      <button class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
  {/if}
  {#if showPickDates  || containsDates}
      <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDates? dateValue : dates}</span></i>
      <button class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
  {/if}
  {#if isTimeChronometer}
      <Cronometer nameTask={inputValue} nameList={nameList} timeChr={timeChronometer} userlog={user}/>
  {/if}
    <div data-testid="datepick" class="datepick-select" hidden>
        <DatePick/>
    </div>
</div>

<style>
  input:checked + label,input:checked + label + i {
      text-decoration: line-through;
  }
</style>