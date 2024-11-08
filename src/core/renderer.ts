import { Router } from "@/router";
import { Component } from "./component";
import { effect } from "./effect";

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
        const newComponent = componentFactory();
        this.currentComponent = newComponent;

        const renderedContent = newComponent.render();
        this.container.innerHTML = renderedContent;

        if (typeof newComponent.onCreate === "function") {
          newComponent.onCreate();
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
