<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import NewTask from './NewTask.svelte';

  export let name = '';
  export let inputValue = '';
  let user: User;
  let taskList = [];

  async function addNewTask(event) {
    if (name) {
      const body = new FormData();
      body.append('listName', name);
      const inputNameTask = event.target.parentNode.querySelector('.input-nameTask');
      inputNameTask?.removeAttribute('hidden');
      const inputNameTask1 = event.target.parentNode.querySelector('.button-add');
      inputNameTask1?.removeAttribute('hidden');
    }
  }

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});

  async function createTask(event) {
      const inputElement = event.target.parentNode.querySelector('.input-nameTask');
      const inputValue = inputElement.value;
      //console.log(name);

    //console.log(user);
      const body = new FormData();
      body.append('userId',user.userId.toString());
      body.append('taskName', inputValue);
      body.append('listName', name);
      body.append('isCompleted', false.toString());
      const result = await fetch('/api/tasks/addTask', {
        method: 'POST',body
      });
      const task = await result.json();
      //console.log(task);

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
  }
</script>

<div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
  <li class="title-List font-bold">{name}</li>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <ul class="ul-listTasks">
    <li class="li-newtask">
      <input class="input-nameTask border-gray-300 bg-gray-100 rounded-[20PX] w-1/2 px-2 py-1 mt-2 text-sm" hidden type="text" name="item1-textfield" placeholder="Name Task....">
      <button class="button-add bg-[#ABC4AA] text-black px-1 py-1 rounded-md text-sm" hidden type="button" on:click={(event) => createTask(event)}>Add</button>
      <ul class="list-Task">
        <!-- -->
        <div>
          <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
          <label class="label-task ml-2" for="task">{inputValue} </label>
        </div>
      <!-- -->
      </ul>
    </li>
  </ul>
</div>

<style>
  input:checked + label {
      text-decoration: line-through;
  }
</style>