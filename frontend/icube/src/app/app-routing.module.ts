import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {SignUpComponent} from "./user/sign-up/sign-up.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";
import { SearchResultsComponent } from './search-results/search-results.component';
import {ProfileComponent} from "./user/profile/profile.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'product-detail', component: ProductDetailsComponent },
  { path: 'category/product-detail/:id', component: ProductDetailsComponent },
  { path: 'category/:id/product-detail/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user/sign-up', component: SignUpComponent },
  { path: 'search-results/:keyword', component: SearchResultsComponent },
  { path: 'user/profile/:id', component: ProfileComponent },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(r => r.AdminModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
