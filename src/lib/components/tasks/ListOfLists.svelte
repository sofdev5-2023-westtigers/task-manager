<script lang="ts">  
	import { onMount } from "svelte";
  import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import TaskList from "./TaskList.svelte";
	import Header from "../header/Header.svelte";
  import TaskBoard from "./TaskBoard.svelte";
  import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction";
	import { saveTask } from "./TaskEdit";
  import ErrorAlert from "./ErrorAlert.svelte";
  let tasksList2 = [];
  $:tasksList2 = tasksListEvents; 
  let user: User;
  let isToggled : Boolean;
  isToggled = localStorage.getItem('isToggled') === 'true';
  let limitToName = 26;
  let nameError = '';
  let errorMessage = '';
  let showAlert = false;
  let showError = false;
  isToggled = localStorage.getItem('isToggled') === 'true';
  onMount(async() => {
    Registry.auth.getUser().subscribe((data: User) => {
      user = data;
    });
  });
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
        if (name.length > limitToName) {
          nameError = 'List name should not exceed ',limitToName,' characters.';
          showAlert = true;
          return;
        }
        nameError = '';
        showAlert = false;
        const body = new FormData();
        body.append('listName', name);
        const response = await fetch('/api/tasks/addList', {
          method: 'POST', body
        });
        if (response.ok) {
          const buttonNewList = document.querySelector('.button-NewList');
          const buttonSortFil = document.querySelector('.button-Filtrar-Ordenar');
          buttonNewList?.removeAttribute('hidden');
          buttonSortFil?.removeAttribute('hidden');
          addNewList.setAttribute('hidden', String(true));
          listTasks = [...listTasks, { name, id: Date.now() }];
          nameInput.value = '';
        } else {
          const data = await response.json();
          errorMessage = data.error;
          showError = true;
          setTimeout(() => {
            showError = false;
          }, 2000);
        }
      }
    }

    function toggle() {
    fetchTasks();
    isToggled = !isToggled;
    console.log("isToggled", isToggled);
    localStorage.setItem('isToggled', isToggled.toString());
  }
</script>

<Header/>

<div class="listTasks" style="padding-top:80px;">
  <div class="w-full sm:w-3/5">
    <div id="addNewList" class="addNewList mt-2 mb-4 sm:mb-0 flex items-center justify-center sm:justify-start" style="padding-left: 100px; padding-right: 100px">
      <input class="text-nameList border-gray-300 bg-gray-100 rounded-[20PX] w-full sm:w-auto px-4 py-2 mr-2 sm:mr-4" type="text" name="name" placeholder="Name List...">
      <button class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" type="button" on:click={createList}>Add List</button>
      {#if showAlert && nameError !== ''}
        <div class="alert mt-2 text-red-500 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{nameError}</span>
        </div>
      {/if}
      {#if !isToggled}
        <div class="form-control">
          <label class="label cursor-pointer">
            <input type="checkbox" class="toggle ml-2 mr-2" on:click={toggle}/>
            <span class="label-text">Board Mode</span>
          </label>
        </div>
      {:else}
        <div class="form-control">
          <label class="label cursor-pointer">
            <input type="checkbox" class="toggle ml-2 mr-2" on:click={toggle} checked/>
            <span class="label-text">Board Mode</span>
          </label>
        </div>
      {/if}
    </div>
    <div id="tasklist" class="taskList mt-2" style="padding-left: 100px; padding-right: 100px">
      <div>{#if showError}
        <ErrorAlert {errorMessage}/>
        <br>
      {/if}</div>
      {#if !isToggled}
    <div class="flex flex-col">
      {#each groupedTasks as group}
        {#if group._id.userId && user && group._id.userId.toString() === user.userId.toString()}
        <TaskList name={group._id.listName} inputValue={group.tasks}/>
        {/if}
      {/each}
      {#each listTasks as list}
          <TaskList key={list.id} name={list.name}/>
        {/each}
    </div>
    {:else}
    <div class="flex flex-row">
      {#each groupedTasks as group}
        {#if group._id.userId && user && group._id.userId.toString() === user.userId.toString()}
          <div class="flex-item">
            <TaskBoard name={group._id.listName} inputValue={group.tasks}/>
          </div> 
        {/if}
      {/each}
      {#each listTasks as list}
      <div class="flex-item">
        <TaskBoard name={list.name}/>
      </div>
        {/each}
    </div>
    {/if}
    </div>
  </div>
</div>