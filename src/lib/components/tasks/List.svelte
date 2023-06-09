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
  
  export let name = '';
  export let inputValue = [];
  let user: User;
  let isAddNewTask  = false;

  async function addNewTask() {
    if (name) {
      const body = new FormData();
      body.append('listName', name);
      isAddNewTask = true;
    }
  }

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

  const handleClick = () => {
    const url = `/todo-lists/${name}/stadisticsList`;
    goto(url, { target: '_blank' });
  };

  async function createTask(event) {
      const inputElement = event.target.parentNode.querySelector('.input-nameTask');

      const inputValue1 = inputElement.value;

      let newTask = null;

      const body = new FormData();
      body.append('userId',user.userId.toString());
      body.append('taskName', inputValue1);
      body.append('listName', name);
      body.append('isCompleted', false.toString());
      body.append('timeChronometer', '0');

      if(showPickDate == true){
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1,dateValue : date, isTimeChronometer: true },
        });
        body.append('date', date);
      }else if(showPickDates == true){
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1, dateValue : dates, isTimeChronometer: true  },
        });
        body.append('dates', dates);
      }else{
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1, isTimeChronometer: true },
        });
      }
      setFalsePicks();
      await fetch('/api/tasks/addTask', {
          method: 'POST',body
      });

      inputValue = [...inputValue, newTask];
      inputElement.value = '';

      isAddNewTask = false;
  }

    async function saveList(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldList = labels[0].textContent;

        if (inputs[0].value == "") {
            inputs[0].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[0].value;
        }

        inputs[0].style.display = "none";
        buttons[1].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.listName-modified');
        const inputValueListName = inputElement.value;

        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('listNameOld', oldList);
        body.append('listName', inputValueListName);
        const result = await fetch('/api/tasks/updateList', {
        method: 'PUT', body
        });
        const task = await result.json();
  }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

  <Header/>

<div style="padding-top:80px;">
  <div style="float: left; width: 60%; margin-left:20px">
    <div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
      <label class="title-List font-bold text-3xl">{name}</label>
      <div class="dropdown dropdown-bottom mx-8 flex justify-end">
        <html data-theme="cupcake">
        </html>
        <label tabindex="0" class="btn m-1 text-xs" style="margin-top:-30px; width: 16%">Options</label>
        <ul tabindex="0" class=" dropdown-content menu p-2 shadow rounded-box w-52">
          <li on:click={addNewTask}><a>Add Task</a></li>
          <li><a on:click={handleClick}>See Stadistics</a></li>
          <li><a href="/todo-lists">Return to Lists</a></li>
        </ul>
      </div>
      <input class="listName-modified border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" type="text" style="display: none;">
      <button on:click={saveList} style="display: none;">Done</button>
      <ul class="ul-listTasks"></ul>
        <li class="li-newtask list-none">
          {#if isAddNewTask}
            <input id="input-nameTask" class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" type="text" name="item1-textfield" placeholder="Name Task....">
            <DatePick/>
            <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 mt-2 rounded-md text-sm" type="button" on:click={(event) => createTask(event)}>Add</button>
          {/if}
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
    <div class="calendarTaskComp" style="margin-right: 35px; margin-top:3px">
      {#each inputValue as task}
      {#if inputValue[inputValue.length - 1]._id === task._id }
          <CalendarTask tasksEvents={tasksListEvents}/>
        {/if}
      {/each}
    </div>
</div>