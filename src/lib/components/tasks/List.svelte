<script lang="ts">
  import { onMount } from 'svelte';
  import { Registry } from '$lib/auth/Registry';
  import DatePick from '$calendar/DatePick.svelte';
  import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';
  import {date, dates, showPickDate, showPickDates, setFalsePicks} from '$calendar/CalendarOptions';
  import {setTaskList } from "$calendarTasks/CalendarTaskFunction";
  import {formatDate } from "./TaskEdit";
  import { goto } from '$app/navigation';
	import CalendarTask from '../calendarTask/CalendarTask.svelte';
  
  export let name = '';
  export let inputValue = [];
  // let calendarTasks = setTaskList(inputValue);
  // console.log(inputValue)
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

  async function createTask(event) {
      const inputElement = event.target.parentNode.querySelector('.input-nameTask');

      const inputValue1 = inputElement.value;

      let newTask = null;

      const body = new FormData();
      body.append('userId',user.userId.toString());
      body.append('taskName', inputValue1);
      body.append('listName', name);
      body.append('isCompleted', false.toString());

      if(showPickDate == true){
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1,dateValue : date },
        });
        body.append('date', date);
      }else if(showPickDates == true){
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1, dateValue : dates },
        });
        body.append('dates', dates);
      }else{
        newTask = new NewTask({
        target: event.target.parentNode.querySelector('.list-Task'),
        props: { inputValue : inputValue1},
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

<div class="toDoList bg-[#675D50] rounded-[10PX] p-4 mb-4" style="display: flex; justify-content: space-between;">
  <h1 class="title-ToDoList text-center text-4xl text-gray-800 font-bold" style="margin: auto; flex-grow: 1;">To-do List</h1>
  <button class="bg-[#ABC4AA] text-white px-4 py-2 rounded-md ml-auto" style="margin-left: auto;">Log Out</button>
</div>

<div>
  <div style="float: left; width: 60%; margin-left:20px">
    <div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
      <label class="title-List font-bold text-2xl">{name}</label>
      <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
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
              <NewTask  inputValue={task.taskName}/>
              {/if}
              {#if task.date}
              <NewTask  inputValue={task.taskName} containsDate={true} dateValue={formatDate(task.date)}/>
              {/if}
              {#if task.dates}
              <NewTask  inputValue={task.taskName} containsDates={true} dateValue={task.dates.map(dateString => formatDate(dateString)).join("-")}/>
              {/if}
            {/if}
            {/each}
          </ul>
        </li>
    </div> 
  </div>
</div>

