import { Signal } from "./signal";

export function effect(fn: () => void): () => void {
  const execute = () => {
    Signal.activeEffect = execute;
    fn();
    Signal.activeEffect = null;
  };

  execute();

  // Return cleanup function
  return () => {
    Signal.activeEffect = null;
  };
}
