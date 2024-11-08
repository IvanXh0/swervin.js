import { Signal } from "./signal";

export function effect(fn: () => void): () => void {
  const execute = () => {
    Signal.activeEffect = execute;
    fn();
    Signal.activeEffect = null;
  };

  execute();

  return () => {
    Signal.activeEffect = null;
  };
}
