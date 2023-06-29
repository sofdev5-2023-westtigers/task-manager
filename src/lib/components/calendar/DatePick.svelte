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
    <input type="text" placeholder="Select a date…" class="input input-bordered mt-2" style="width: 200px;" on:click={handleClick} class:hidden={showRadioButtons} />
    {#if showRadioButtons}
        <OptionsDate/>
    {/if}
</div>
