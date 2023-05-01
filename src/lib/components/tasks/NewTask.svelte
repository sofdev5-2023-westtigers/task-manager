<script lang=ts>
    export let inputValue = '';
    export let containsDate = false;
    export let containsDates = false;
    export let dateValue = '';
    export let datesValue = '';
    import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
    let user: User;
    async function save(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldValue = labels[0].textContent;
        if (inputs[1].value == "") {
            inputs[1].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[1].value;
        }
        
        
        buttons[0].style.display = "none";
        inputs[1].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.task-modified');
        const inputValue = inputElement.value;
        // const body = new FormData();
        // body.append('userId', user.userId.toString());
        // body.append('taskNameOld', oldValue);
        // body.append('taskName', inputValue);
        // const result = await fetch('/api/tasks/addTask', {
        // method: 'PUT', body
        // });
        // const task = await result.json();
        // console.log(task);
    }
    onMount(() => {
        Registry.auth.getUser().subscribe((data: User) => {
            user = data;
		});
	});
    
    function show() {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        inputs[1].value = labels[0].textContent
        buttons[0].style.display = "inline";
        inputs[1].style.display = "inline";
    }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div>
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2" for="task" on:click={show}>{inputValue}</label>
    <input class="task-modified "type="text" style="display: none;">
    <button on:click={save} style="display: none;">Done</button>
    {#if containsDate}
        <i class="mi mi-calendar"><span class="u-sr-only">{dateValue}</span></i>
    {/if}
    {#if containsDates}
        <i class="mi mi-calendar"><span class="u-sr-only">{datesValue}</span></i>
    {/if}
</div>

<style>
    input:checked + label, input:checked + label + i {
        text-decoration: line-through;
    }
</style>