<!-- Cronometro.svelte -->
<script lang="ts">
    import { iniciarCronometro, pausarCronometro, reanudarCronometro } from './cronometer';
  
    let running = false;
  
    function iniciar() {
      iniciarCronometro();
      running = true;
    }
  
    function pausar() {
      pausarCronometro();
      running = false;
    }
  
    function reanudar() {
      reanudarCronometro();
      running = true;
    }
  </script>
  
  <div>
    {#if running}
      <button on:click={pausar}>Pausar</button>
    {:else}
      <button on:click={iniciar}>Iniciar</button>
    {/if}
    <button on:click={reanudar}>Reanudar</button>
  </div>
  