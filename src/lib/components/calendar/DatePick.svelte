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
    <input type="text" placeholder="Select a date…" class="input rounded-[2PX] w-2 px-1 py-1 mt-2 text-sm" on:click={handleClick} class:hidden={showRadioButtons} />

    {#if showRadioButtons}
        <OptionsDate/>
    {/if}
</div>
