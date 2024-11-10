import { JSXElement } from "./jsx";

export interface Component {
  render: () => string | JSXElement;
  onCreate?: () => void;
  onDestroy?: () => void;
}

export function createComponent(
  template: () => string | JSXElement,
  setup?: {
    onCreate?: () => void;
    onDestroy?: () => void;
  },
): () => Component {
  return () => ({
    render: template,
    onCreate: setup?.onCreate,
    onDestroy: setup?.onDestroy,
  });
}
