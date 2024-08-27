import { Route } from '@angular/router'

export const VIEW_ROUTES: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboards/dashboards.route').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.routes').then(
        (mod) => mod.INVENTORY_ROUTES
      ),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./sales/sales.routes').then(
        (mod) => mod.SALES_ROUTES
      ),
  },
  {
    path: 'purchases',
    loadChildren: () =>
      import('./purchases/purchases.routes').then(
        (mod) => mod.PURCHASES_ROUTES
      ),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
]
