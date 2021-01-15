let refId = 0;

export function focused(ref: HTMLElement | null, resolve: Function) {
  if (!ref) {
    return false;
  }
  ref.ontouchstart = () => {
    document.body.className = 'noTouch';
    ((cacheRefId) => {
      setTimeout(() => {
        if (refId === cacheRefId) {
          resolve(refId);
        }
      }, 1000);
    })(refId);
  };
  ref.ontouchend = () => {
    refId++;
    document.body.className = '';
  };
}
