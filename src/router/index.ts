import { Signal } from "@/core/signal";

export interface Route {
  path: string;
  component: () => any;
}

export class Router {
  private routes: Route[] = [];
  private currentRoute: Signal<string>;

  constructor() {
    // Get initial route from window location
    const initialPath = window.location.pathname;
    this.currentRoute = new Signal<string>(initialPath);

    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      this.currentRoute.set(window.location.pathname);
    });
  }

  addRoute(path: string, component: () => any): void {
    this.routes.push({ path, component });
  }

  navigate(path: string): void {
    // Don't navigate if we're already on the path
    if (this.currentRoute.get() === path) return;

    window.history.pushState({}, "", path);
    this.currentRoute.set(path);
  }

  getCurrentComponent(): (() => any) | null {
    const route = this.routes.find((route) => {
      // Exact match
      if (route.path === this.currentRoute.get()) return true;

      // Pattern match (for dynamic routes if you add them later)
      const pattern = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$",
      );
      return pattern.test(this.currentRoute.get());
    });

    return route?.component || null;
  }

  // Helper method to get route params (for future use with dynamic routes)
  getParams(): Record<string, string> {
    const route = this.routes.find((route) => {
      const pattern = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$",
      );
      return pattern.test(this.currentRoute.get());
    });

    if (!route) return {};

    const paramNames = (route.path.match(/:\w+/g) || []).map((param) =>
      param.slice(1),
    );
    const paramValues = this.currentRoute
      .get()
      .match(new RegExp(route.path.replace(/:\w+/g, "([^/]+)")));

    const params: Record<string, string> = {};
    if (paramValues) {
      paramNames.forEach((name, index) => {
        params[name] = paramValues[index + 1];
      });
    }

    return params;
  }
}
