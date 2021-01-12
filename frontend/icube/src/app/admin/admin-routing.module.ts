import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {BannersComponent} from "./banners/banners.component";
import {ProductsComponent} from "./products/products.component";
import {OrdersComponent} from "./orders/orders.component";
import {UsersComponent} from "./users/users.component";
import {AddNewProductComponent} from "./products/add-new-product/add-new-product.component";

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'banners', pathMatch: 'exact', component: BannersComponent },
  { path: 'orders', pathMatch: 'exact', component: OrdersComponent },
  { path: 'users', pathMatch: 'exact', component: UsersComponent },
  { path: 'products', pathMatch: 'exact', component: ProductsComponent },
  { path: 'products/add', component: AddNewProductComponent },
  { path: 'products/add/:id', component: AddNewProductComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
