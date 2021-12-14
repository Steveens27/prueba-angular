import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { ProductCreateComponent } from './components/product/product-create/product-create.component';

import { OrdersDeleteComponent } from './components/order/order-delete/order-delete.component';
import { OrdersUpdateComponent } from './components/order/order-update/order-update.component';
import { OrdersCrudComponent } from "./views/order-crud/order-crud.component";
import { OrdersCreateComponent } from './components/order/order-create/order-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  },

  {
    path: "orders",
    component: OrdersCrudComponent
  },
  {
    path: "orders/create",
    component: OrdersCreateComponent
  },
  {
    path: "orders/update/:id",
    component: OrdersUpdateComponent
  },
  {
    path: "orders/delete/:id",
    component: OrdersDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
