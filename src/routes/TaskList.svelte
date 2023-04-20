<script>
  export let name = '';
  import Task from './Task.svelte';

  function deleteTaskList() {
    const taskDiv = document.querySelector(".list");
    taskDiv.remove();
  }

  function addNewTask(event) {
    if (name) {
      const newTask = new Task({
        target: event.target.parentNode.querySelector('.ul-listTasks'),
      });
    }
    editMode = 0;
  }
</script>

<div class="list">
  <li class="title-List">{name}</li>
  <button class="button-AddTask" type="button" on:click={addNewTask}>Add task</button>
  <button class="button-deleteList" type="button" on:click={deleteTaskList}>Delete List</button>
  <ul class="ul-listTasks"></ul>
</div>
