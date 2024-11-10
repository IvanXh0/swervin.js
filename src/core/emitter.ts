declare global {
  interface Window {
    __emit: (id: number) => void;
    __emitStore: Map<number, () => void>;
  }
}

window.__emitStore = new Map();
let handlerId = 0;

window.__emit = function (id: number) {
  const fn = window.__emitStore.get(id);
  if (fn) fn();
};

export const emit = (fn: () => void) => {
  const id = handlerId++;
  window.__emitStore.set(id, fn);
  return `window.__emit(${id})`;
};

export const clearEmitters = () => {
  window.__emitStore.clear();
};
