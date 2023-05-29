<script lang="ts">
    import { onMount } from 'svelte';
    import { Registry } from '$lib/auth/Registry';
    import DatePick from '$calendar/DatePick.svelte';
    import type { User } from '$lib/auth/User';
    import {date, dates} from '$calendar/CalendarOptions';
    import { saveTask, showTasks, saveCalendar, showCalendar} from "./TaskEdit";
  
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
        <div data-testid="content" class="flex flex-row place-items-center justify-between form-control">
            <input data-testid="input" type="text" hidden>
            <label class="label-text" on:click={showTasks} >{name}</label>
            <input data-testid="input-edit" class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
            <button data-testid="button-done" class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={saveTask(event, user)} style="display: none;">Done</button>
            <label class="cursor-pointer label">
                {#if isCompleted}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" checked />
                {:else}
                    <input class="checkbox checkbox-accent" type="checkbox" name="task" />
                {/if}
            </label>
        </div>
        {#if containsDate}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDate? dateValue : date}</span></i>
            <button class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
        {/if}
        {#if containsDates}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDates? dateValue : dates}</span></i>
            <button class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates)} hidden>Save</button>
        {/if}
        <div data-testid="datepick" class="datepick-select" hidden>
            <DatePick/>
        </div>
    </div>
</div>