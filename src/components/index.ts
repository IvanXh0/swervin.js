import TestComponent from "./TestComponent";

export const components = new Map([["TestComponent", TestComponent]]);

export function getComponent(name: string) {
  const component = components.get(name);
  if (!component) {
    console.error(`Component ${name} not found`);
    return () => `<div>Component ${name} not found</div>`;
  }
  return component;
}
