import { effect } from "./effect";
import { Router } from "../router";
import { Component } from "./component";

export class DOMRenderer {
  private container: HTMLElement;
  private router: Router;
  private currentComponent: Component | null = null;

  constructor(container: HTMLElement, router: Router) {
    this.container = container;
    this.router = router;
  }

  mount(): void {
    effect(() => {
      const componentFactory = this.router.getCurrentComponent();

      if (this.currentComponent?.onDestroy) {
        this.currentComponent.onDestroy();
      }

      if (componentFactory) {
        this.currentComponent = componentFactory();
        this.container.innerHTML = this.currentComponent.render();

        if (this.currentComponent.onCreate) {
          this.currentComponent.onCreate();
        }
      } else {
        this.container.innerHTML = "<div>404 - Not Found</div>";
      }
    });
  }
}
