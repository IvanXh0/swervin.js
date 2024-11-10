// html.ts
// Helper type for HTML attributes
type HTMLAttributeValue = string | number | boolean | null | undefined;

// Custom attribute type that includes our special handlers
interface CustomAttributes {
  onclick?: string;
  onchange?: string;
  onsubmit?: string;
  class?: string;
  id?: string;
  style?: string;
  // Add other common attributes and event handlers
}

// Create a mapped type for HTML attributes including our custom ones
type ElementAttributes<T extends keyof HTMLElementTagNameMap> = Partial<{
  [K in keyof (HTMLElementTagNameMap[T] &
    CustomAttributes)]: HTMLAttributeValue;
}>;

// Type for child content
type ChildContent = string | number | boolean | null | undefined;

// Type helpers for IDE support
type ValidElements = keyof HTMLElementTagNameMap;
type ValidAttributes<T extends ValidElements> = ElementAttributes<T>;

// Type checking helper
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

// Helper functions for common elements
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

// Main template literal tag function
export function html(
  strings: TemplateStringsArray,
  ...values: ChildContent[]
): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? "");
  }, "");
}

// Type augmentation for global html function
declare global {
  function html(
    strings: TemplateStringsArray,
    ...values: ChildContent[]
  ): string;
}
