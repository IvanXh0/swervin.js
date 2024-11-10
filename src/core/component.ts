import { JSXElement } from "./jsx";
import { getCurrentHooks, resetHooks } from "./lifecycle";

export interface Component {
  render: () => string | JSXElement;
  onCreate?: () => void;
  onDestroy?: () => void;
}

export function createComponent(
  template: () => string | JSXElement,
): () => Component {
  resetHooks();

  template();

  const hooks = getCurrentHooks() || {};

  resetHooks();

  return () => ({
    render: template,
    onCreate: hooks.onCreate,
    onDestroy: hooks.onDestroy,
  });
}
