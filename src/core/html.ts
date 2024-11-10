type HTMLAttributeValue = string | number | boolean | null | undefined;

interface CustomAttributes {
  onclick?: string;
  onchange?: string;
  onsubmit?: string;
  class?: string;
  id?: string;
  style?: string;
}

type ElementAttributes<T extends keyof HTMLElementTagNameMap> = Partial<{
  [K in keyof (HTMLElementTagNameMap[T] &
    CustomAttributes)]: HTMLAttributeValue;
}>;

type ChildContent = string | number | boolean | null | undefined;

type ValidElements = keyof HTMLElementTagNameMap;
type ValidAttributes<T extends ValidElements> = ElementAttributes<T>;

export function createElement<T extends ValidElements>(
  tag: T,
  attrs: ValidAttributes<T> = {},
  ...children: ChildContent[]
): string {
  const attributes = Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");

  return `<${tag}${attributes}>${children.join("")}</${tag}>`;
}

export const div = (
  attrs: ValidAttributes<"div"> = {},
  ...children: ChildContent[]
) => createElement("div", attrs, ...children);

export const button = (
  attrs: ValidAttributes<"button"> = {},
  ...children: ChildContent[]
) => createElement("button", attrs, ...children);

export const input = (attrs: ValidAttributes<"input"> = {}) =>
  createElement("input", attrs);

export function html(
  strings: TemplateStringsArray,
  ...values: ChildContent[]
): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? "");
  }, "");
}

declare global {
  function html(
    strings: TemplateStringsArray,
    ...values: ChildContent[]
  ): string;
}
