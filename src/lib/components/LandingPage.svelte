<script>
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';

	onMount(() => {
		Registry.auth.checkParams();
	});
	let logout = () => {
		Registry.auth.logout();
	};
</script>


<div data-testid="navbar" class="navbar bg-[#ABC4AA] h-32" >
    <div class="flex-1 px-2 lg:flex-none" >
        <img data-testid="logo Landing" src="../src/resources/west.png"  class="w-21 h-16"/>
        <a data-testid="title proyect" class="text-4xl text-[#675D50] font-bold"> West Tigers</a>
    </div> 
    <div class="flex justify-end flex-1 px-2">
        <div class="flex items-stretch">
            <a data-testid="logOut-button" on:click={logout} class="text-xl text-[#675D50] btn btn-ghost rounded-btn">Logout</a>
        </div>
    </div>
</div>
<div data-testid="hero-content" class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="../src/resources/image-removebg-preview.png" class="max-w-sm rounded-lg shadow-2xl"/>
        <div>
            <h1 data-testid="TASK MANAGER" class="text-7xl text-[#675D50] font-bold ">TASK  MANAGER</h1>
            <p  data-testid="description" class="py-6 text-2xl text-[#675D50]">On this platform, you will be able to effectively keep track of your daily tasks in a simple and intuitive way. 
                With our tool, you will be able to assign responsibilities, set deadlines and track the progress of your tasks.</p>
                <a href="/todo-lists" class="btn bg-[#ABC4AA] border-none text-[#675D50]">See Lists</a>
        </div>
    </div>
</div>