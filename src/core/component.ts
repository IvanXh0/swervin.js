export type Props = Record<string, any>;

export interface Component {
  render: () => string;
  onCreate?: () => void;
  onDestroy?: () => void;
}

export function createComponent(
  template: (props?: any) => string,
  setup?: (props?: any) => Partial<Component>,
): (props?: any) => Component {
  return (props = {}) => {
    const setupResult = setup?.(props) || {};

    return {
      render: () => template(props),
      ...setupResult,
    };
  };
}
