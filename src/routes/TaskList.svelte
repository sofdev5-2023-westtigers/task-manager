<script>
  export let name = '';

  function deleteTaskList() {
    const taskDiv = document.querySelector(".list");
    taskDiv.remove();
  }
</script>

<div class="list">
  <li class="title-List">{name}</li>
  <button class="button-AddTask" type="button">Add task</button>
  <button class="button-deleteList" type="button" on:click={deleteTaskList}>Delete List</button>
</div>
