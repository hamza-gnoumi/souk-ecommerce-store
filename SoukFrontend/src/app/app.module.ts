import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminPoductsComponent } from './components/Admin/admin-poducts/admin-poducts.component';
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
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AvatarModule } from 'primeng/avatar';
import { BrandsComponent } from './components/home-page/brands/brands.component';
import { FooterHomeComponent } from './components/home-page/footer-home/footer-home.component';
import { ManageOrdersComponent } from './components/Admin/manage-orders/manage-orders.component';
import { ShowOrderComponent } from './components/show-order/show-order.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { ManageUsersComponent } from './components/Admin/manage-users/manage-users.component';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ManageCategoriesComponent } from './components/Admin/manage-categories/manage-categories.component';
import { CategoryFormComponent } from './components/Admin/category-form/category-form.component';
import { HttpInterceptorService } from './services/http-interceptor.service';




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
    BrandsComponent,
    FooterHomeComponent,
    ManageOrdersComponent,
    ShowOrderComponent,
    ShowCartComponent,
    ManageUsersComponent,
    ManageCategoriesComponent,
    CategoryFormComponent,
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
    SidebarModule,
    ConfirmPopupModule,

  ],
  providers: [
    MessageService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
