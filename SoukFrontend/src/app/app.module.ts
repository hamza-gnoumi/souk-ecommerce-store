import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminPoductsComponent } from './components/admin-poducts/admin-poducts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogComponent } from './components/blog/blog.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollTopModule } from 'primeng/scrolltop';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AvatarModule } from 'primeng/avatar';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    AdminPoductsComponent,
    NotFoundComponent,
    BlogComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    ScrollTopModule,
    GalleriaModule,
    StyleClassModule,
    AvatarModule,

  ],
  providers: [
    MessageService, ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
