<script>  

    import TaskList from "./TaskList.svelte";

    let lists = [];

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
        lists = [...lists, { name, id: Date.now() }];
        nameInput.value = '';
      }
    }
</script>

<div class="toDoList">
    <h1 class="title-ToDoList">To-do List</h1>
    <button class="button-NewList" hidden on:click={handleNewListClick}>New List</button>
</div>

<div class="lists" id="listsTask">
    <div id="addNewList" class="addNewList">
        <input class="text-nameList" type="text" name="name" placeholder="Name List....">
        <button class="button-addList" type="button" on:click={createList}>Add List</button>
    </div>
  
    <div id="tasklist" class="taskList">
          {#each lists as list}
            <TaskList key={list.id} name={list.name} />
          {/each}
    </div>
</div>