<script lang="ts">
    import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import type { User } from '$lib/auth/User';
    export let inputValue = '';
    let user: User;
    async function save(event) {
        const parent = this.parentElement;
        const inputs = parent.querySelectorAll('input');
        const labels = parent.querySelectorAll('label');
        const buttons = parent.querySelectorAll('button');
        const oldValue = labels[0].textContent;
        // console.log("holTNew")
        // console.log(inputs[0].value)
        // console.log(inputs[1].value)
        // console.log(oldValue)
        if (inputs[1].value == "") {
            inputs[1].value = labels[0].textContent;
        } else {
            labels[0].textContent = inputs[1].value;
        }
        
        
        buttons[0].style.display = "none";
        inputs[1].style.display = "none";
        const inputElement = event.target.parentNode.querySelector('.task-modified');
        const inputValue = inputElement.value;
        const checkbox = event.target.parentNode.querySelector('.checkbox-task');
        const isChecked = checkbox.checked;
        console.log(isChecked, "hi")
        const body = new FormData();
        body.append('userId', user.userId.toString());
        body.append('taskNameOld', oldValue);
        body.append('taskName', inputValue);
        body.append('isCompleted', isChecked.toString());
        const result = await fetch('/api/tasks/addTask', {
        method: 'PUT', body
        });
        const task = await result.json();
        console.log(task);
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

<div style="margin-bottom:2px;">
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2 border-gray-300 bg-gray-100 rounded-[10PX] w-1/6 px-1 py-1 mt-2 text-sm" for="task" on:click={show}>{inputValue}</label>
    <input class="task-modified "type="text" style="display: none;">
    <button on:click={save} style="display: none;">Done</button>
</div>

<style>
    input:checked + label {
        text-decoration: line-through;
    }
</style>