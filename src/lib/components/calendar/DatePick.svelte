<script lang="ts">
    import { onMount } from 'svelte';
    import OptionsDate from './OptionsDate.svelte';

    let showRadioButtons = false;

    function handleClick() {
        showRadioButtons = !showRadioButtons;
    }

    onMount(() => {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.date-input-container')) {
                showRadioButtons = false;
            }
        });
    });
</script>

<div class="date-input-container">
    <button type="button" class="date-button" on:click={handleClick}>
        <i class="mi mi-calendar"></i>
    </button>
    {#if showRadioButtons}
        <OptionsDate/>
    {/if}
</div>

<style>
    .date-input-container {
        margin: 1px;
        position: relative;
        display: inline-block;
    }

    .date-button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        color: black;
        background-color: white;
        width: 2em;
        height: 2em;
        border-radius: 30px;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

</style>
