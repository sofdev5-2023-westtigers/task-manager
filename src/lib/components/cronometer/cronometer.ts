let intervalId: number | null = null;
let tiempoInicial: number | null = null;
let tiempoPausado: number | null = null;
export let timeChro: number;


export function asignarValorTime(timeNew : number){
    tiempoInicial = timeNew;
}

export function parseTimeMin(timeChr : number) {
  if (timeChr !== null) {
    const minutes = Math.floor(timeChr / 1000 / 60);
      return minutes;
  }
  return null;
}

export function parseTimeSec(timeChr : number) {
  if (timeChr !== null) {
    const seconds = Math.floor(timeChr / 1000) % 60;
      return seconds;
  }
  return null;
}

export function iniciarCronometro(callback: (minutes: number, seconds: number) => void): void {
  if (intervalId === null) {
    tiempoInicial = Date.now();
    intervalId = setInterval(() => {
      const tiempoTranscurrido = Date.now() - (tiempoInicial || 0);
      const seconds = Math.floor(tiempoTranscurrido / 1000) % 60;
      const minutes = Math.floor(tiempoTranscurrido / 1000 / 60);
      callback(minutes, seconds);
      timeChro = tiempoTranscurrido;
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

export function reanudarCronometro(callback: (minutes: number, seconds: number) => void): void {
  if (intervalId === null) {
    if (tiempoPausado != null) {
      const tiempoTranscurrido = tiempoPausado - tiempoInicial;
      tiempoInicial = Date.now() - tiempoTranscurrido;
    }else{
      tiempoInicial = Date.now() - tiempoInicial;
    }

    intervalId = setInterval(() => {
      const tiempoTranscurrido = Date.now() - (tiempoInicial || 0);
      const seconds = Math.floor(tiempoTranscurrido / 1000) % 60;
      const minutes = Math.floor(tiempoTranscurrido / 1000 / 60);
      callback(minutes, seconds);
      timeChro = tiempoTranscurrido;
    }, 1000);
  }
}