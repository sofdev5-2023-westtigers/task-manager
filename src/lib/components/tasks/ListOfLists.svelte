<script lang="ts">  
    import { onMount } from "svelte";
    import { Registry } from '$lib/auth/Registry';
    import type { User } from '$lib/auth/User';
    import TaskList from "./TaskList.svelte";
    import Header from "../header/Header.svelte";
    import TaskBoard from "./TaskBoard.svelte";
    import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction";
    import ErrorAlert from "./ErrorAlert.svelte";
    import AddListForm from "./AddListForm.svelte";
    let tasksList2 = [];
    let listTasks: any[] = [];
    $:tasksList2 = tasksListEvents; 
    let user: User;
    let isToggled : Boolean;
    isToggled = localStorage.getItem('isToggled') === 'true';
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
    let groupedTasks: any[] = [];
    async function fetchTasks() {
      const res = await fetch('/api/tasks/getList');
      groupedTasks = await res.json();
    }
    fetchTasks();
</script>

<Header/>

<div class="listTasks" style="padding-top:80px;">
  <div class="w-full sm:w-3/5">
    <div id="tasklist" class="taskList mt-2" style="padding-left: 100px; padding-right: 100px">
      <div>{#if showError}
        <ErrorAlert {errorMessage}/>
        <br>
      {/if}</div>
    <div class="flex flex-row">
      {#each groupedTasks as group}
        {#if group._id.userId && user && group._id.userId.toString() === user.userId.toString()}
          <div class="flex-item">
            <TaskBoard name={group._id.listName} inputValue={group.tasks}/>
          </div> 
        {/if}
      {/each}
      {#each listTasks as list}
      <div class="flex-item px-2">
        <TaskBoard name={list.name}/>
      </div>
        {/each}
        <div class=" px-3">
          <AddListForm/>
        </div>
    </div>
    </div>
  </div>
</div>
