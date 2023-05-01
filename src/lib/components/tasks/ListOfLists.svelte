<script lang="ts">  
	import { onMount } from "svelte";
  import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import TaskList from "./TaskList.svelte";

    let user: User;

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

<div class="toDoList bg-[#675D50] rounded-[10PX] p-4 mb-4">
    <h1 class="title-ToDoList text-center text-4xl text-gray-800 font-bold">To-do List</h1>
    <button class="button-NewList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" hidden on:click={handleNewListClick}>New List</button>
</div>

<div class="listTasks" id="listsTask">
    <div id="addNewList" class="addNewList">
        <input class="text-nameList border-gray-300 bg-gray-100 rounded-[20PX] w-3/3 px-4 py-2" type="text" name="name" placeholder="Name List....">
        <button class="button-addList bg-[#ABC4AA] text-white px-4 py-2 rounded-md" type="button" on:click={createList}>Add List</button>
    </div>
  
    <div id="tasklist" class="taskList">
          {#each listTasks as list}
            <TaskList key={list.id} name={list.name} />
          {/each}
    </div>
</div>



{#each groupedTasks as group}
 {#if group._id.userId && user && group._id.userId.toString() === user.userId.toString()}
 <TaskList name={group._id.listName} inputValue={group.tasks} />

 {/if}
{/each}
<!-- {JSON.stringify(data)} -->


