<script lang="ts">  
	import { onMount } from "svelte";
  import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import TaskList from "./TaskList.svelte";
  import CalendarTask from "$calendarTasks/CalendarTask.svelte";
  import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction.ts";
  let tasksList2 = [];
  $:tasksList2 = tasksListEvents; 

  let user: User;

  onMount(async() => {
    Registry.auth.getUser().subscribe((data: User) => {
      user = data;
    });
  });

  let logout = () => {
      Registry.auth.logout();
    };
    
  let groupedTasks = [];
  async function fetchTasks() {
    const res = await fetch('/api/tasks/getList');
    groupedTasks = await res.json();
  }
  fetchTasks();

  let listTasks = [];

  function handleNewListClick() {
      const addNewList = document.querySelector('.addNewList');
      addNewList?.removeAttribute('hidden');
  }
  
  async function createList() {
    const nameInput = event.target.parentNode.querySelector('.text-nameList');
    const name = nameInput.value.trim();
    const addNewList = document.querySelector('.addNewList');
    if (name) {
      const body = new FormData();
      body.append('listName', name);
      await fetch('/api/tasks/addList', {
        method: 'POST',body
      });
      const buttonNewList = document.querySelector('.button-NewList');
      const buttonSortFil = document.querySelector('.button-Filtrar-Ordenar');
      buttonNewList?.removeAttribute('hidden');
      buttonSortFil?.removeAttribute('hidden');
      addNewList.setAttribute('hidden', true);
      listTasks = [...listTasks, { name, id: Date.now() }];
      nameInput.value = '';
    }
  }
</script>

<div class="toDoList bg-[#675D50] rounded-[10PX] p-4 mb-4" style="display: flex; justify-content: space-between;">
  <button class="button-NewList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" hidden on:click={handleNewListClick} style="margin-right: auto;">New List</button>
  <h1 class="title-ToDoList text-center text-4xl text-gray-800 font-bold" style="margin: auto; flex-grow: 1;">To-do List</h1>
  <button class="bg-[#ABC4AA] text-white px-4 py-2 rounded-md ml-auto" style="margin-left: auto;" on:click={logout}>Log Out</button>
</div>

<div class="listTasks" id="listsTask">
  <div style="float: left; width: 60%;">
    <div id="addNewList" class="addNewList mt-2" style=" margin-left:30px;  margin-bottom:20px;">
      <input class="text-nameList border-gray-300 bg-gray-100 rounded-[20PX] w-3/3 px-4 py-2" type="text" name="name" placeholder="Name List....">
      <button class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" type="button" on:click={createList}>Add List</button>
    </div>
    <div id="tasklist" class="taskList mt-2" style="margin-left:30px; width:150%">
      {#each listTasks as list}
        <TaskList key={list.id} name={list.name} />
      {/each}
      {#each groupedTasks as group}
        {#if group._id.userId && user && group._id.userId.toString() === user.userId.toString()}
          <TaskList name={group._id.listName} inputValue={group.tasks} />
        {/if}
      {/each}
    </div>
  </div>
  <div class="calendarTaskComp" style="float: right; margin-right: 50px; width: 37%">
    <CalendarTask tasksEvents={tasksList2}/>
  </div>
  <div></div>
</div>