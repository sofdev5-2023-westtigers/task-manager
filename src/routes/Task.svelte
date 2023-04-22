<script>
  import NewTask from './NewTask.svelte';
  let taskList = [];

  function createTask(event) {
    const inputElement = event.target.parentNode.querySelector('.input-nameTask');
    const inputValue = inputElement.value;

    const newTask = new NewTask({
      target: event.target.parentNode.querySelector('.list-Task'),
      props: { inputValue },
    });

    taskList = [...taskList, newTask];
    inputElement.value = '';

    const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
    inputNameTask?.setAttribute('hidden', true);
    const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
    inputNameTask1?.setAttribute('hidden', true);
    const deleteTask = event.target.parentNode.querySelector('.button-delete');
    deleteTask?.removeAttribute('hidden');
  }
</script>

<li class="li-newtask">
  <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" type="text" name="item1-textfield" placeholder="Name Task....">
  <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={(event) => createTask(event)}>Add</button>
  <ul class="list-Task">
  </ul>
</li>