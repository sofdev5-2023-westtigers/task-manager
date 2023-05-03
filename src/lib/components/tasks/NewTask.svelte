<script>
    export let inputValue = '';
    export let containsDate = false;
    export let containsDates = false;
    export let dateValue = '';
    export let datesValue = '';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>

<div style="margin-bottom:2px;">
    <input class="checkbox-task form-checkbox h-5 w-5 text-gray-600 rounded-lg align-middle" type="checkbox" name="task">
    <label class="label-task ml-2" for="task">{inputValue} </label>
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