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

<div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
  <li class="title-List font-bold">{name}</li>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <button class="button-deleteList bg-[#ee6767] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={deleteTaskList}>Delete List</button>
  <ul class="ul-listTasks"></ul>
</div>
