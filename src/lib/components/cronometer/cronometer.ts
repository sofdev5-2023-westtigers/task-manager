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