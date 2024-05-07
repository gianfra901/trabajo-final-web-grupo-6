import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { ShopCartComponent } from './pages/shop-cart/shop-cart.component';
import { ShopCartCheckoutComponent } from './pages/shop-cart-checkout/shop-cart-checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "contact", component: ContactComponent},
  {path: "blog", component: BlogComponent},
  {path: "shop", component: ShopComponent},
  {path: "shop-details/:id", component: ShopDetailsComponent},
  {path: "shop-cart", component: ShopCartComponent},
  {path: "shop-cart-checkout", component: ShopCartCheckoutComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
