interface CustomEvents {
  onclick?: string;
  onchange?: string;
  onsubmit?: string;
  onkeydown?: string;
  onkeyup?: string;
  onkeypress?: string;
  onfocus?: string;
  onblur?: string;
}

type HTMLAttributes = {
  class?: string;
  id?: string;
  style?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  checked?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  title?: string;
} & CustomEvents;

export interface JSXElement {
  type: string;
  props: HTMLAttributes;
  children: (JSXElement | string | number)[];
}

export function createElement(
  type: string,
  props: HTMLAttributes | null,
  ...children: (JSXElement | string | number)[]
): JSXElement {
  return {
    type,
    props: props || {},
    children: children
      .flat()
      .map((child) => (child === undefined || child === null ? "" : child)),
  };
}

declare global {
  namespace JSX {
    interface Element extends JSXElement {}

    interface IntrinsicElements {
      div: HTMLAttributes;
      span: HTMLAttributes;
      p: HTMLAttributes;
      a: HTMLAttributes;
      button: HTMLAttributes;
      input: HTMLAttributes;
      form: HTMLAttributes;
      h1: HTMLAttributes;
      h2: HTMLAttributes;
      h3: HTMLAttributes;
      h4: HTMLAttributes;
      h5: HTMLAttributes;
      h6: HTMLAttributes;
    }
  }
}
