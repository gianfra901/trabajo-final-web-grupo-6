import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { ShopCartComponent } from './pages/shop-cart/shop-cart.component';
import { ShopCartCheckoutComponent } from './pages/shop-cart-checkout/shop-cart-checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { TOASTR_TOKEN, Toastr } from './application/service/toastr.service';
import { RegisterComponent } from './pages/register/register.component';

declare const toastr: Toastr;

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ContactComponent,
    ShopComponent,
    ShopDetailsComponent,
    ShopCartComponent,
    ShopCartCheckoutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimations(),
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
 
})

export class AppModule { }
