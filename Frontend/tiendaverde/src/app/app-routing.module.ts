import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ShopCartCheckoutComponent } from './shop-cart-checkout/shop-cart-checkout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "contact", component: ContactComponent},
  {path: "blog", component: BlogComponent},
  {path: "shop", component: ShopComponent},
  {path: "shop-details/:id", component: ShopDetailsComponent},
  {path: "shop-cart", component: ShopCartComponent},
  {path: "shop-cart-checkout", component: ShopCartCheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
