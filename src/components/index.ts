import { Component } from "@/core/component";
import CounterControls from "./CounterControls";
import Testing from "./Testing";

type ComponentFactory = () => Component;

export const components = new Map<string, ComponentFactory>([
  ["CounterControls", CounterControls],
  ["Testing", Testing],
]);

export function getComponent(name: string): ComponentFactory {
  const component = components.get(name);
  if (!component) {
    console.error(`Component ${name} not found`);
    return () => ({
      render: () => `<div>Component ${name} not found</div>`,
      onCreate: () => {},
      onDestroy: () => {},
    });
  }
  return component;
}
