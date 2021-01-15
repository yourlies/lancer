let timeStamp = 0;

export function double(event: Event) {
  if (event.timeStamp - timeStamp < 500) {
    timeStamp = 0;
    return true;
  } else {
    timeStamp = event.timeStamp;
    return false;
  }
}
