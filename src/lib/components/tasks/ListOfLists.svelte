<script lang="ts">  
    import type { PageData } from "../../../routes/$types";
    import TaskList from "./TaskList.svelte";

    /*export let data: PageData;
    /*export let data: {
      lists: any;
    }
    $: ({ lists } = data);*/

    let listTasks = [];

    function handleNewListClick() {
        const addNewList = document.querySelector('.addNewList');
        addNewList?.removeAttribute('hidden');
    }
  
    function createList() {
      const nameInput = event.target.parentNode.querySelector('.text-nameList');
      const name = nameInput.value.trim();
      const addNewList = document.querySelector('.addNewList');
  
      if (name) {
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