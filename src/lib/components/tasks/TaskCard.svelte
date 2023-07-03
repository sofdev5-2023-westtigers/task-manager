<script lang="ts">
    import { onMount } from 'svelte';
    import { Registry } from '$lib/auth/Registry';
    import DatePick from '$calendar/DatePick.svelte';
    import type { User } from '$lib/auth/User';
    import {date, dates} from '$calendar/CalendarOptions';
    import { saveTask, showTasks, saveCalendar, showCalendar} from "./TaskEdit";
    import {getMembersTaskList} from '../tasks/MembersTaskList';;
    import { msg, setMsg } from '../modalAddMember/Addmsg';

    export let name = '';
    export let listName : string = '';
    export let isCompleted : boolean;
    export let dateValue = '';
    export let containsDate = false;
    export let containsDates = false;

    let user: User;
    let prevDate : any;
    let prevDates : any;
    let showDatePicker = false;

    onMount(() => {
        Registry.auth.getUser().subscribe((data: User) => {
            user = data;
        });
    });

    function updateCalendar(event: MouseEvent & { currentTarget: EventTarget & HTMLSpanElement; }) {
        showCalendar(event);
        prevDate = date;
        prevDates = dates;
        showDatePicker = !showDatePicker;
    }
    function cancelUpdate() {
        showDatePicker = false;
    }
    function saveAndUpdate(event) {
        saveCalendar(event, user, date, dates, prevDate, prevDates,listName, name);
        cancelUpdate();
    }

    async function sendMsg(){
        const memberList = await getMembersTaskList(listName, name);
        console.log(memberList);

        memberList.forEach(member => {
            const msgNew = {
                to: member.email,
                from: 'wt028615@gmail.com',
                subject: "Task Complete!!",
                text: "task are complete",
                html: "Task " + name + " of the " + listName +  " list are complete!"
            };

            console.log(member.email);

            setMsg(msgNew);

            fetch('/api/mail/sendmail', {
                method: 'POST',
                body: JSON.stringify(msg),
                headers: { 'Content-Type': 'application/json' }
            });
        });
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
            <input data-testid="input-edit" class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] px-1 py-1 mt-2 text-sm" type="text" style="display: none; width: 100px;">
            <button data-testid="button-done" class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={() => saveTask(event, user,listName)} style="display: none;">Done</button>
            {#if isCompleted}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user, listName)} checked />
            {:else}
                <input class="checkbox checkbox-accent" type="checkbox" name="task" on:change={() => saveTask(event, user,listName)} on:change={() => sendMsg()}/>
            {/if}
        </div>
        {#if containsDate}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDate? dateValue : date}</span></i>
            {#if showDatePicker}
                <div data-testid="datepick" class="datepick-select">
                    <DatePick/>
                </div>
                <button class="buttonSaveDate px-2 py-1 rounded-full text-xs font-medium" name="save" type="button" on:click={saveAndUpdate}>Save</button>
                <button class="buttonCancelDate px-2 py-1 rounded-full text-xs font-medium" name="cancel" type="button" on:click={cancelUpdate}>Cancel</button>
            {/if}
        {/if}
        {#if containsDates}
            <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{containsDates? dateValue : dates}</span></i>
            {#if showDatePicker}
                <div data-testid="datepick" class="datepick-select">
                    <DatePick/>
                </div>
                <button class="buttonSaveDate px-2 py-1 rounded-full text-xs font-medium" name="save" type="button" on:click={saveAndUpdate}>Save</button>
                <button class="buttonCancelDate px-2 py-1 rounded-full text-xs font-medium" name="cancel" type="button" on:click={cancelUpdate}>Cancel</button>
            {/if}
        {/if}
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
    .buttonSaveDate {
        margin-top: 1px;
        color: #fff;
        background-color: rgba(173, 244, 143, 0.69);

    }
    .buttonCancelDate {
        margin-top: 1px;
        color: #fff;
        background-color: #f00;
    }

    .datepick-select {
        margin: 2px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

</style>