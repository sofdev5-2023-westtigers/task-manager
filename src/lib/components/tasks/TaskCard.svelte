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
    let modalOpen = false;

    onMount(() => {
        Registry.auth.getUser().subscribe((data: User) => {
            user = data;
        });
    });

    function updateCalendar(event: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement; }) {
        showCalendar(event);
        prevDate = date;
        prevDates = dates;
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
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
            <input data-testid="input-edit" class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] px-1 py-1 mt-2 text-sm" type="text" style="display: none; width: 120px;">
            <button data-testid="button-done" class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={() => saveTask(event, user)} style="display: none;">Done</button>
            {#if isCompleted}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user)} checked />
            {:else}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user)}/>
            {/if}
        </div>
        {#if containsDate}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDate? dateValue : date}</span></i>
        {/if}
        {#if containsDates}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDates? dateValue : dates}</span></i>
        {/if}
    </div>
    <div
            id="popup-modal"
            tabindex="-1"
            class={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${modalOpen ? '' : 'hidden'}`}
    >
        <div class="relative w-64 h-[80%] max-w-md max-h-full overflow-auto border-4 border-black">
            <div class="relative bg-white rounded-lg shadow dark">
                <button type="button" on:click={closeModal} class="modal-close-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div class="p-8 text-center">
                    <h3 class="modal-heading">Update date</h3>
                    <DatePick class="date-pick"/>
                    <button class="modal-button" name="save" type="button" on:click={(event) => {saveCalendar(event, user, date, dates, prevDate, prevDates); closeModal();}}>Save</button>
                </div>
            </div>
        </div>
    </div>

</div>

<style>
    .grid {
        border: 3px solid #c4c3c3;
        border-radius: 30px;
        margin-top: 10px;
    }
    .label-text {
        color: #675D50;
        font-family: 'Canva Sans', sans-serif;
    }
    .modal-heading {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: normal;
        color: #666;
    }
    .modal-button {
        background-color: #c4bcbc;
        color: black;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .modal-close-button {
        position: absolute;
        color: #000000;
        background-color: transparent;
        border-radius: 1rem;
        right: 0.5rem;
    }
    .relative {
        border: 1px solid #000000;

        border-radius: 10px;
    }
</style>