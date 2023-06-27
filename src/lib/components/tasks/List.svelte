<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction";
  import {formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
	import CalendarTask from '../calendarTask/CalendarTask.svelte';
	import Header from '../header/Header.svelte';
  import {setMsg, msg} from '$mail/AddMsg';
  import {addNewTask, createTask, saveList} from './Tasks';

  import { Button, Modal, Label, Input } from 'flowbite-svelte';

  let modalMembersList = false;
  let modalAddMembersList = false;
  export let name = '';
  export let inputValue = [];
  let user: User;
  let isMenuOpen = false;
  let taskList = [];

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

  const handleClick = () => {
    const url = `/todo-lists/${name}/stadisticsList`;
    goto(url, { target: '_blank' });
  };

  function submitForm() {
    const inputElement = document.getElementById("emailP");
    const inputValue1 = inputElement?.value;
    setMsg(inputValue1, "Added to a list!!", "added to a list", "in the task manager app you were added to the list" + name);
    fetch("/api/mail/sendmail");
  }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

  <Header/>

  <div class=" top justify-center flex flex-wrap" style="padding-top: 100px;">
    <div style="margin-left:20px; margin-right: 20px ;min-width: 420px">
      <div class=" w-auto list bg-[#A9907E] rounded-[10PX] max-w-xl p-4 mb-4">
        <label class="title-List font-bold text-3xl" style="white-space: pre-line;">{name.replace(/(.{22})/g, "$&\n")}</label>
        <button class="btn text-xs" style="margin-left:40px;margin-right:15px" on:click={() => modalMembersList = true}>+</button>
        <button class="btn text-xs" on:click={ (event) => addNewTask(event, name)}>Add New Task</button>
        <div class="dropdown dropdown-bottom mx-4">
          <label tabindex="0" class="btn m-1 text-xs" on:click={() => { isMenuOpen = !isMenuOpen; }}>{isMenuOpen ? 'Close' : 'Options'}</label>
          <ul tabindex="0" class=" menu dropdown-content p-2 rounded-box w-52 bg-success" style={isMenuOpen ? 'display: block' : 'display: none'}>
            <li><a on:click={handleClick}>See Stadistics</a></li>
            <li><a href="/todo-lists">Return to Lists</a></li>
          </ul>
          <!-- You can open the modal using ID.showModal() method -->
          <Modal bind:open={modalMembersList} autoclose>
            <svelte:fragment slot='header'>
              <h1 style="margin-right:20px;">members of list</h1>
              <Button pill={true} outline={true} class="!p-2" size="xl" on:click={() => modalAddMembersList = true}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 2v16m-8-8h16" stroke="currentColor" stroke-width="2"></path>
                </svg>
              </Button>
              <Modal bind:open={modalAddMembersList} size="xs" autoclose={false} class="w-full">
                <form class="flex flex-col space-y-6" action="#">
                  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Member</h3>
                  <Label class="space-y-2">
                    <span>Email</span>
                    <Input class="emailP" id="emailP" type="email" name="email" placeholder="name@company.com" required />
                  </Label>
                  <Button type="submit" class="w-full1" on:click={() => submitForm()}>Add Member to List</Button>
                </form>
              </Modal>
            </svelte:fragment>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </Modal>
        </div>
        <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
        <button on:click={(event) =>saveList(event, user)} style="display: none;">Done</button>
        <ul class="ul-listTasks"></ul>
          <li class="li-newtask list-none">
            <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
            <div class="datepick-select" hidden>
              <DatePick/>
            </div>
            <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" hidden type="button" on:click={createTask(event, user, name, date, dates, showPickDate, showPickDates, setFalsePicks, taskList, false, true)}>Add</button>
          <ul class="list-Task mt-2 list-none">
            {#each inputValue as task}
            {#if task}
              {#if !task.dates && !task.date}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
              {#if task.date}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} containsDate={true} dateValue={formatDate(task.date)} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
              {#if task.dates}
              <NewTask  inputValue={task.taskName} nameList={task.listName} isChecked={JSON.parse(task.isCompleted)} containsDates={true} dateValue={task.dates.map(dateString => formatDate(dateString)).join("-")} timeChronometer={task.timeChronometer} isTimeChronometer={true}/>
              {/if}
            {/if}
            {/each}
          </ul>
        </li>
    </div> 
  </div>
  <div style="width: 50%; min-width:fit-content">
    <div class="calendarTaskComp" style="margin-right: 35px; margin-left: 35px; margin-top:3px; margin-bottom: 30px;">
      {#each inputValue as task}
      {#if inputValue[inputValue.length - 1]._id === task._id }
          <CalendarTask tasksEvents={tasksListEvents}/>
        {/if}
      {/each}
    </div>
  </div>
</div>