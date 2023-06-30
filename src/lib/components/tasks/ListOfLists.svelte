<script lang="ts">  
    import { onMount } from "svelte";
    import { Registry } from '$lib/auth/Registry';
    import type { User } from '$lib/auth/User';
    import TaskList from "./TaskList.svelte";
    import Header from "../header/Header.svelte";
    import TaskBoard from "./TaskBoard.svelte";
    import { tasksListEvents } from "$calendarTasks/CalendarTaskFunction";
    import ErrorAlert from "./ErrorAlert.svelte";
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

    let limitToName = 26;
    let showForm = false;
    let listName = '';

    async function createList() {
        const nameInput = document.querySelector('.text-nameList');
        const name = nameInput.value.trim();
        if (name && nameInput) {
            if (name.length > limitToName) {
            nameError = 'List name should not exceed ',limitToName,' characters.';
            errorMessage = nameError;
            showError = true;
                setTimeout(() => {
                    showError = false;
                }, 2000);
                listName = "";
            return;
            }
            nameError = '';
            showAlert = false;
            const body = new FormData();
            body.append('listName', name);

            let members: string[] = [''];
            members.forEach((member) => {
              body.append('listMembers[]', member);
            });
            
            const response = await fetch('/api/tasks/addList', {
            method: 'POST', body
            });
            if (response.ok) {
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
        handleHide();
    }

    function handleAddList() {
        showForm = true;
    }

    function handleHide() {
        showForm = false;
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
    <div id="tasklist" class="taskList mt-2 mx-2">
      <div>
        {#if showError}
          <ErrorAlert message={errorMessage}/>
          <br>
        {/if}
      </div>
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
              <div class="flex-item px-2">
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
              {#if !showForm}
                  <button
                      class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md"
                      type="button"
                      style="font-weight: bold; width: 250px; font-size:large;"
                      on:click={handleAddList}>
                          + Add List
                  </button>
              {/if}

              {#if showForm}
                  <div
                      class="px-4 py-2 rounded-md"
                      style="background-color: #F2F2F2; width: 250px; border: 3px solid #D9D9D9;"
                  >
                      <div class="flex justify-center">
                          <input class="text-nameList rounded-md text-gray-600" style="border: 3px solid #D9D9D9;" type="text" bind:value={listName} placeholder="List Name" />
                      </div>
                      <div class=" mt-2">
                          <button class="button-addList rounded-md bg-[#ABC4AA]" style="height: 25px; width: 50px; border: 3px solid #92AD91;" on:click={createList}>OK</button>
                          <button class="rounded-md " style="background-color: #EDB491; height: 25px; width: 80px; border: 3px solid #BB9075;" on:click={handleHide}>CANCEL</button>
                      </div>
                  </div>
              {/if}

            </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<div class="fixed bottom-3 right-3">
  <div class="form-control">
    <label class="label cursor-pointer">
      <button
      class="btn btn-primary btn-radio h-20"
      data-selected={isToggled}
      on:click={toggle}>
      <div>
        <span class=" text-lg">Board Mode</span>
          <div>
            {#if isToggled}
              <span class=" text-3xl" style="font-weight: bolder;">ON</span>
            {:else}
              <span class=" text-3xl" style="font-weight: bolder;">OFF</span>
            {/if}
          </div>
      </div>
      </button>
    </label>
  </div>
</div>

<style>
  .btn-radio {
    background-color: white;
    color: #abc4aa;
    border-color: #abc4aa;
  }

  .btn-radio[data-selected='true'] {
    background-color: #abc4aa;
    color: white;
  }
</style>
