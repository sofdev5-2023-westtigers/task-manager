// cronometro.ts

let intervalId: number | null = null;
let tiempoInicial: number | null = null;
let tiempoPausado: number | null = null;

export function iniciarCronometro(): void {
  if (intervalId === null) {
    tiempoInicial = Date.now();
    intervalId = setInterval(() => {
      const tiempoTranscurrido = Date.now() - (tiempoInicial || 0);
      console.log(tiempoTranscurrido);
    }, 1000);
  }
}

export function pausarCronometro(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    tiempoPausado = Date.now();
    
  }
}

export function reanudarCronometro(): void {
  if (intervalId === null && tiempoInicial !== null && tiempoPausado !== null) {
    const tiempoTranscurrido = tiempoPausado - tiempoInicial;
    tiempoInicial = Date.now() - tiempoTranscurrido;
    intervalId = setInterval(() => {
      const tiempoActual = Date.now() - (tiempoInicial || 0);
      console.log(tiempoActual);
    }, 1000);
  }
}
