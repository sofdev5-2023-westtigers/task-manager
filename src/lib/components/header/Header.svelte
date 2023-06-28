<script lang="ts">  
	import { onMount } from "svelte";
    import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';

    let user: User;

    onMount(async() => {
        Registry.auth.getUser().subscribe((data: User) => {
            user = data;
        });
    });

    let logout = () => {
        Registry.auth.logout();
    };
</script>

<div class="toDoList bg-[#675D50] p-4 mb-4" style="display: flex; justify-content: space-between; right: 0; left: 0; height: 70px; width:100%; position:fixed; z-index: 3;">
    <h1 class="title-ToDoList text-center text-4xl text-white font-bold" style="margin: auto; flex-grow: 1;">
        <a href="/todo-lists" style="text-decoration: none; color: inherit;">To-do List</a>
    </h1>      
    <button class="bg-[#ABC4AA] text-white px-4 py-2 rounded-md ml-auto" style="margin-left: auto;" on:click={logout}>Log Out</button>
</div> 