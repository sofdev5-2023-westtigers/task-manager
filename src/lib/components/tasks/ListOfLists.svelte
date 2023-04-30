<script lang="ts">  
	import { onMount } from "svelte";
  import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import TaskList from "./TaskList.svelte";

    // ======================================

    let posts = []
    let user: User;

    onMount(async() => {
      posts = await getPost();
      Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
    });

    

    const getPost = async () => {
      const res = await fetch('/api/tasks/getList');
      const data = await res.json();
      //const filterData = data.slice(0, 3);
      //console.log(filterData);
      return data;
    };

    //$: console.log(posts);
    

    // =======================================


    let listTasks = [];

    function handleNewListClick() {
        const addNewList = document.querySelector('.addNewList');
        addNewList?.removeAttribute('hidden');
    }
  
    async function createList() {

      const nameInput = event.target.parentNode.querySelector('.text-nameList');
      const name = nameInput.value.trim();
      const addNewList = document.querySelector('.addNewList');
      console.log(user.userId);
  
      if (name) {
        //console.log(user);
        const body = new FormData();
        body.append('listName', name);
        const result = await fetch('/api/tasks/addList', {
          method: 'POST',body
        });
        const task = await result.json();
        console.log(task);
        //
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



{#await getPost()}
{:then data}
{#each data as {taskName, listName, userId}}
 
  {#if userId && user && userId.toString() === user.userId.toString()}
    <TaskList name={listName} inputValue={taskName} />
  {/if}
{/each}
<!-- {JSON.stringify(data)} -->
{/await}