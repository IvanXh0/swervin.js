export interface Component {
  render: () => string;
  onCreate?: () => void;
  onDestroy?: () => void;
}

export type ComponentSetup = {
  onCreate?: () => void;
  onDestroy?: () => void;
};

export function createComponent(
  template: () => string,
  setup?: ComponentSetup,
): () => Component {
  return () => ({
    render: template,
    onCreate: setup?.onCreate,
    onDestroy: setup?.onDestroy,
  });
}
