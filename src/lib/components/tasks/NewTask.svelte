<script lang="ts">
    import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
    import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions.ts';
    export let inputValue = '';
    export let containsDate = false;
    export let dateValue = '';
    let user: User;
    let prevDate;
    let prevDates;
  
    async function save(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldValue = labels[0].textContent;
        // console.log("holTNew")
        // console.log(inputs[0].value)
        // console.log(inputs[1].value)
        // console.log(oldValue)
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
          oldChecked = false;
        }
        console.log(isChecked, "hi")
        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('taskNameOld', oldValue);
        body.append('taskName', inputValue);
        body.append('isCompletedOld', oldChecked.toString());
        body.append('isCompleted', isChecked.toString());
        const result = await fetch('/api/tasks/addTask', {
        method: 'PUT', body
        });
        const task = await result.json();
        console.log(task);
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

      const result = await fetch('/api/tasks/addTask', {
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

<div style="margin-bottom:2px;">
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2" for="task" on:click={show}>{inputValue}</label>
    <input class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm"type="text" style="display: none;">
    <button class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={save} style="display: none;">Done</button>
    {#if showPickDate}
        <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{date}</span></i>
        <button class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
    {/if}
    {#if showPickDates}
        <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{dates}</span></i>
        <button class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
    {/if}
</div>

<style>
    input:checked + label,input:checked + label + i  {
        text-decoration: line-through;
    }
</style>