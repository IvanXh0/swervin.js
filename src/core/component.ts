export type Props = Record<string, any>;

export interface Component {
  render: () => string;
  onCreate?: () => void;
  onDestroy?: () => void;
}

export function createComponent(
  template: (props: Props) => string,
  setup?: (props: Props) => Partial<Component>,
): (props: Props) => Component {
  return (props: Props) => {
    const setupResult = setup?.(props) || {};

    return {
      render: () => template(props),
      ...setupResult,
    };
  };
}
