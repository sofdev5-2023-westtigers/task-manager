<script lang="ts">
    import { onMount } from 'svelte';
    import { Registry } from '$lib/auth/Registry';
    import DatePick from '$calendar/DatePick.svelte';
    import type { User } from '$lib/auth/User';
    import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
    import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from "./TaskEdit";
  
    export let name = '';
    let user: User;
    export let isCompleted : boolean;
    export let dateValue = '';
    export let containsDate = false;
    export let containsDates = false;
  
    let prevDate : any;
    let prevDates : any;
  
    onMount(() => {
          Registry.auth.getUser().subscribe((data: User) => {
              user = data;
          });
      });
  
    async function save(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldValue = labels[0].textContent;
        let oldChecked = true;
        if (inputs[0].value == "") {
            inputs[0].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[0].value;
        }
        
        buttons[0].style.display = "none";
        inputs[0].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.task-modified');
        const inputValue = inputElement.value;
        const checkbox = event.target.parentNode.querySelector('.checkbox-task');
        const isChecked = checkbox.checked;
        if (!isChecked) {
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
        inputs[0].value = labels[0].textContent
        //labels[0].style.display = "none";
        buttons[0].style.display = "inline";
        inputs[0].style.display = "inline";
    }
    
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div class="grid grid-rows-1 gap-2">
    <div class="p-2 rounded shadow-sm border-gray-100 border-2">
    <!-- <label class="label-task ml-2" for="task" on:click={show}>{name}</label> -->
    <!-- <input class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm"type="text" style="display: none;"> -->
    <!-- <button class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={save} style="display: none;">Done</button>  -->
        <div class="flex flex-row place-items-center justify-between form-control">
            <label class="label-text" on:click={show} >{name}</label>
            <input class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] px-1 py-1 mt-2 text-sm"type="text" style="display: none;">
            <button class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={save} style="display: none;">Done</button>
            <label class="cursor-pointer label">
                {#if JSON.parse(isCompleted.toString())}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" checked />
                {:else}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" />
                {/if}
            </label>
        </div>
        {#if showPickDate || containsDate}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDate? dateValue : date}</span></i>
            <button class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
        {/if}
        {#if showPickDates  || containsDates}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDates? dateValue : dates}</span></i>
            <button class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
        {/if}
    </div>
</div>