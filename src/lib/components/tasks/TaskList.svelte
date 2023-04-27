<script lang="ts">
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
  import Task from './Task.svelte';


  export let name = '';
  let user: User;

  async function addNewTask() {
    if (name) {
      const body = new FormData();
      body.append('listName', name);
      const newTask = new Task({
        target: event.target.parentNode.querySelector('.ul-listTasks'),
      });
    }
  }

  onMount(() => {
		Registry.auth.getUser().subscribe((data: User) => {
			user = data;
		});
	});
</script>

<div class="list bg-[#A9907E] rounded-[10PX] w-1/2 p-4 mb-4">
  <li class="title-List font-bold">{name}</li>
  <button class="button-AddTask bg-[#c4bcbc] text-black px-1 py-1 rounded-md text-sm" type="button" on:click={addNewTask}>Add task</button>
  <ul class="ul-listTasks"></ul>
</div>
