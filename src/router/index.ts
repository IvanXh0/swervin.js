import { Component } from "../core/component";
import { Signal } from "../core/signal";

export interface RouteDefinition {
  path: string;
  component: () => Component;
}

export class Router {
  private routes: RouteDefinition[] = [];
  private currentRoute: Signal<string>;

  constructor() {
    this.currentRoute = new Signal<string>(window.location.pathname);

    window.addEventListener("popstate", () => {
      this.currentRoute.set(window.location.pathname);
    });
  }

  addRoute(path: string, component: () => Component): void {
    this.routes.push({ path, component });
  }

  navigate(path: string): void {
    window.history.pushState({}, "", path);
    this.currentRoute.set(path);
  }

  getCurrentComponent(): (() => Component) | null {
    const route = this.routes.find(
      (route) => route.path === this.currentRoute.get(),
    );
    return route?.component || null;
  }
}
