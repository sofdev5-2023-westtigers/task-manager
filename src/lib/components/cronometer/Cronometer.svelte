<script lang="ts">
  import type { User } from '$lib/auth/User';
  import {parseTimeSec, parseTimeMin } from './cronometer';

  let running = false;
  export let nameTask : string;
  export let nameList : string;
  export let userlog : User;
  export let timeChr : number = 0;
  let minutes : number = parseTimeMin(timeChr);
  let seconds : number = parseTimeSec(timeChr);
  let intervalId: number | null = null;
  let tiempoInicial: number | null = timeChr;
  let tiempoPausado: number | null = null;
  let timeChro: number;

  function iniciar(): void {
    running = true;
    if (intervalId === null) {
    tiempoInicial = Date.now();
    intervalId = setInterval(() => {
      const tiempoTranscurrido = Date.now() - (tiempoInicial || 0);
      seconds = Math.floor(tiempoTranscurrido / 1000) % 60;
      minutes = Math.floor(tiempoTranscurrido / 1000 / 60);
      timeChro = tiempoTranscurrido;
    }, 1000);
  }
}

  async function pausar() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      tiempoPausado = Date.now();

      const body = new FormData();
      body.append('userId', userlog.userId.toString());
      body.append('taskName', nameTask);
      body.append('listName', nameList);
      body.append('modifyChronometerTime', "true");
      body.append('oldTimeChronometer',timeChr.toString());
      body.append('timeChronometer',timeChro.toString());
      const result = await fetch('/api/tasks/updateTasks', {
        method: 'PUT', body
      });
    running = false;
    }
  }

  function reanudar(): void {
    running = true;
    if (intervalId === null) {
      if (tiempoPausado != null) {
        const tiempoTranscurrido = tiempoPausado - tiempoInicial;
        tiempoInicial = Date.now() - tiempoTranscurrido;
      }else{
        tiempoInicial = Date.now() - tiempoInicial;
      }

      intervalId = setInterval(() => {
        const tiempoTranscurrido = Date.now() - (tiempoInicial || 0);
        seconds = Math.floor(tiempoTranscurrido / 1000) % 60;
        minutes = Math.floor(tiempoTranscurrido / 1000 / 60);
        timeChro = tiempoTranscurrido;
      }, 1000);
    }
}
</script>


<div class="cronometer">
  {#if running}
  <button class="btn btn-circle btn-outline" on:click={pausar}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
    </svg>
  </button>
  {:else}
  <button class="btn btn-circle btn-outline" on:click={iniciar}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  </button>
  {/if}
  <div class="">
    <p id="demo" class="mx-2 mt-3">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
  </div>
<div>
  <button class="btn btn-circle btn-outline" on:click={reanudar}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
  </button>
</div>
</div>

<style>
  .cronometer {
    width: 200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  button {
    padding: auto;
    margin-left: 10px;
    margin-right: 10px;
    width: 45px;
    border-radius: 50px;
  }
</style>
