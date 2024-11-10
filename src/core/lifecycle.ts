export type LifecycleHooks = {
  onCreate?: () => void;
  onDestroy?: () => void;
};

let currentLifecycleHooks: LifecycleHooks | null = null;

export function useLifecycle(hooks: LifecycleHooks) {
  if (!currentLifecycleHooks) {
    currentLifecycleHooks = hooks;
  }
}

export function getCurrentHooks(): LifecycleHooks | null {
  return currentLifecycleHooks;
}

export function resetHooks() {
  currentLifecycleHooks = null;
}
