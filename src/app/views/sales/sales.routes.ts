import { Route } from "@angular/router";
import { CustomersComponent } from "./customers/customers.component";
import { ClosingComponent } from "./closing/closing.component";

export const SALES_ROUTES : Route[] = [
    {
        path : 'customers',
        component : CustomersComponent,
        data: { title: 'Customers' },
    },
    {
        path : 'closing',
        component : ClosingComponent,
        data: { title: 'Closing' },
    }
]