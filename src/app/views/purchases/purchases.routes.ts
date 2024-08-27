import { Route } from "@angular/router";
import { BillsComponent } from "./bills/bills.component";
import { SupplierComponent } from "./supplier/supplier.component";

export const PURCHASES_ROUTES : Route[] = [
    {
        path : 'suppliers',
        component : SupplierComponent,
        title : 'Suppliers'
    },
    {
        path : 'bills',
        component : BillsComponent,
        title : 'Bills'
    }
]