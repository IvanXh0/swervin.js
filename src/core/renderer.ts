import { Router } from "@/router";
import { Component } from "./component";
import { effect } from "./effect";
import { JSXElement } from "./jsx";

export function renderToString(element: JSXElement | string | number): string {
  if (typeof element === "string" || typeof element === "number") {
    return String(element);
  }

  const { type, props, children } = element;

  const attributes = Object.entries(props)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");

  const renderedChildren = children
    .map((child) => renderToString(child))
    .join("");

  return `<${type}${attributes}>${renderedChildren}</${type}>`;
}

export class DOMRenderer {
  private container: HTMLElement;
  private router: Router;
  private currentComponent: Component | null = null;
  private updateListener: () => void;

  constructor(container: HTMLElement, router: Router) {
    this.container = container;
    this.router = router;
    this.updateListener = () => this.refresh();
    window.addEventListener("componentUpdated", this.updateListener);
  }

  mount(): void {
    this.refresh();
  }

  refresh(): void {
    effect(() => {
      const componentFactory = this.router.getCurrentComponent();

      if (
        this.currentComponent &&
        typeof this.currentComponent.onDestroy === "function"
      ) {
        this.currentComponent.onDestroy();
      }

      if (componentFactory) {
        const component = componentFactory();
        this.currentComponent = component;

        const rendered = component.render();
        const content =
          typeof rendered === "string"
            ? rendered
            : renderToString(rendered as JSXElement);

        this.container.innerHTML = content;

        if (component.onCreate) {
          component.onCreate();
        }
      } else {
        this.currentComponent = null;
        this.container.innerHTML = "<div>404 - Not Found</div>";
      }
    });
  }

  destroy(): void {
    if (
      this.currentComponent &&
      typeof this.currentComponent.onDestroy === "function"
    ) {
      this.currentComponent.onDestroy();
    }
    window.removeEventListener("componentUpdated", this.updateListener);
  }
}
