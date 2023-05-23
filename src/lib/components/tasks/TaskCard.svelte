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
    // export let taskDate : string;
    // export let taskDates : any;
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
  
    function updateCalendar(event) {
      showCalendar(event);
  
      prevDate = date;
      prevDates = dates;
    }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div class="grid grid-rows-1 gap-2">
    <div class="p-2 rounded shadow-sm border-gray-100 border-2">
        <div class="form-control">
            <label class="cursor-pointer label">
                <span class="label-text">{name}</span>
                {#if JSON.parse(isCompleted.toString())}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" checked />
                {:else}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" />
                {/if}
            </label>
        </div>
        {#if showPickDate || containsDate}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDate? dateValue : date}</span></i>
            <button class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
        {/if}
        {#if showPickDates  || containsDates}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => showCalendar(event)}>{containsDates? dateValue : dates}</span></i>
            <button class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event)} hidden>Save</button>
        {/if}
    </div>
</div>