import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { ShopCartCheckoutComponent } from './shop-cart-checkout/shop-cart-checkout.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ContactComponent,
    ShopComponent,
    ShopDetailsComponent,
    ShopCartComponent,
    ShopCartCheckoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
