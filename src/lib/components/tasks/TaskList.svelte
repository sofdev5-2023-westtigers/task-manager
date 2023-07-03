<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import {getMembersTaskList} from '../tasks/MembersTaskList';;
  import { msg, setMsg } from '../modalAddMember/Addmsg';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import { saveTask, showTasks, saveCalendar, showCalendar, formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
  import {addNewTask, createTask, saveList} from './Tasks'

  export let name = '';
  export let inputValue = [];
  export let isToggled:boolean;

  let user: User;
  let taskList = [];
  export let inputValueListName = '';

  let prevDate;
  let prevDates;

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

  const handleClick = () => {
    const url = `/todo-lists/${name}`;
    goto(url, { target: '_blank' });
  };

  function updateCalendar(event) {
    showCalendar(event);

    prevDate = date;
    prevDates = dates;
  }

  let isShowNew: boolean = false;

	function hiddenShowAddTask() {
		isShowNew = !isShowNew;
	}

  async function sendMsg(nameTask : string){
      const formattedName: string = name.replace(/(.{1,36})/g, "$1\n");
        const memberList = await getMembersTaskList(formattedName, nameTask);
        console.log(nameTask);

        memberList.forEach(member => {
            const msgNew = {
                to: member.email,
                from: 'wt028615@gmail.com',
                subject: "Task Complete!!",
                text: "task are complete",
                html: "Task " + nameTask + " of the " + name +  " list are complete!"
            };

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

<div class="list bg-[#A9907E] rounded-[10PX] p-4 mb-1" style="border: 4px solid #796353">
  <label class="title-List font-bold text-3xl" on:click={handleClick} style="white-space: pre-line;">{name.replace(/(.{1,36})/g, "$1\n")}</label>
  <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
  <button on:click={saveList(event, user)} style="display: none;">Done</button>
  <ul class="ul-listTasks"></ul>
  <li class="li-newtask list-none pt-3">
    <input class="border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
    <div class="datepick-select" hidden>
      <DatePick/>
    </div>
    <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList, false, false)}>Add</button>
    <ul class="list-Task mt-2 list-none">
      {#each inputValue as task}
        {#if task}
          <div style="margin-bottom:2px;" class="mt-2">
            {#if JSON.parse(task.isCompleted)}
              <input class="checkbox form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task" on:change={() => saveTask(event, user, name)} on:change={() => sendMsg(task.taskName)} checked>
            {:else}
              <input class="checkbox form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task" on:change={() => saveTask(event, user, name)} on:change={() => sendMsg(task.taskName)}>
            {/if}
            <label class="label-task ml-2 text-xl"  for="task"  on:click={showTasks}>{task.taskName} </label>
            <input class="task-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
            <button class="buttonDone bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" on:click={saveTask(event, user)} style="display: none;">Done</button>
            {#if task.date}
              <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{formatDate(task.date)}</span></i>
              <button  class="buttonDoneDate bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates, name, task.taskName)} hidden>Save</button>
            {/if}
            {#if task.dates}
              <i class="mi mi-calendar"><span class="u-sr-only" on:click={(event) => updateCalendar(event)}>{task.dates.map(dateString => formatDate(dateString)).join("-")}</span></i>
              <button  class="buttonDoneDates bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" name="save" type="button" on:click={(event) => saveCalendar(event, user, date, dates, prevDate, prevDates, name, task.taskName)} hidden>Save</button>
            {/if}
          </div>
        {/if}
      {/each}
    </ul>
  </li>

  
</div>
      <div class="rounded-md flex flex-col place-items-center mb-4" style="background-color: #F2F2F2; border: 3px solid #D9D9D9">
  {#if !isShowNew}
    <button
      class=" btn-ghost button-AddTask rounded-md text-lg h-10 w-full"
      type="button"
      on:click={(addNewTask(event, name), hiddenShowAddTask)}>
      + New
    </button>
  {/if}
  {#if isShowNew}
    <div class="flex-col p-2">
      <input
        data-testid="input-name-task"
        class="input-nameTask text-black border-gray-300 bg-gray-100 rounded-[20PX] px-2 py-1 mt-2 text-sm"
        type="text"
        name="item1-textfield"
        placeholder="Name Task...."
      />
      <DatePick />
      <div class=" pt-2">
        <button
        data-testid="button-add"
        class="button-add bg-[#ABC4AA] text-black rounded-md"
        type="button"
        style="height: 25px; width: 50px; border: 3px solid #92AD91;"
        on:click={createTask(
          event,
          user,
          name,
          date,
          dates,
          showPickDate,
          showPickDates,
          setFalsePicks,
          taskList,
          isToggled,
          true
        ), hiddenShowAddTask()}>ADD</button
        >
        <button class="rounded-md " style="background-color: #EDB491; height: 25px; width: 80px; border: 3px solid #BB9075;" on:click={hiddenShowAddTask}>CANCEL</button>
      </div>
      
    </div>
  {/if}
</div>

<style>
  input:checked + label, input:checked + label + i {
      text-decoration: line-through;
  }
</style>