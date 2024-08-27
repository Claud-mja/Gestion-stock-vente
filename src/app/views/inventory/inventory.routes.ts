import { Route } from "@angular/router";
import { ItemsComponent } from "./items/items.component";
import { AdjustementsComponent } from "./adjustements/adjustements.component";

export const INVENTORY_ROUTES : Route[] = [
    {
        path : 'items',
        component : ItemsComponent,
        data: { title: 'Items' },
    },
    {
        path : 'adjustements',
        component : AdjustementsComponent,
        data: { title: 'Inventory adjustements' },
    }
]