<script lang="ts">
    import { onMount } from 'svelte';
    import { Registry } from '$lib/auth/Registry';
    import DatePick from '$calendar/DatePick.svelte';
    import type { User } from '$lib/auth/User';
    import {date, dates} from '$calendar/CalendarOptions';
    import { saveTask, showTasks, saveCalendar, showCalendar} from "./TaskEdit";

    export let name = '';
    export let isCompleted : boolean;
    export let dateValue = '';
    export let containsDate = false;
    export let containsDates = false;

    let user: User;
    let prevDate : any;
    let prevDates : any;

    onMount(() => {
        Registry.auth.getUser().subscribe((data: User) => {
            user = data;
        });
    });

    function updateCalendar(event: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement; }) {
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
            <input data-testid="input-edit" class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
            <button data-testid="button-done" class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={() => saveTask(event, user)} style="display: none;">Done</button>
            {#if isCompleted}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user)} checked />
            {:else}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user)}/>
            {/if}
            <label class="label-text" on:click={showTasks} >{name}</label>


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

<style>
    input:checked + label, input:checked + label + i {
        text-decoration: line-through;
    }
    .p-2 {
        background-color: #fff;
        border: 3px solid #c4c3c3;
        border-radius: 30px;
        margin: 10px;
        padding: 6px 8px;
        display: flex;
        align-items: center;
    }

    .label-text {
        color: #675D50;
        font-size: 18px;
        line-height: 16px;
        margin-top: 4px;
        margin-right: 10px;
        font-family: 'Canva Sans', sans-serif;
    }
     .grid {
         background-color: #ffffff;
     }
     .checkbox{
         margin-right: 10px;
     }


</style>