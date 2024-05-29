import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPoductsComponent } from './components/Admin/admin-poducts/admin-poducts.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ShowOrderComponent } from './components/show-order/show-order.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { ManageOrdersComponent } from './components/Admin/manage-orders/manage-orders.component';
import { AuthGuard } from './services/auth/auth-gard.service';
import { AdminAuthGard } from './services/auth/admin-auth-gard.service';
import { ManageUsersComponent } from './components/Admin/manage-users/manage-users.component';
import { ManageCategoriesComponent } from './components/Admin/manage-categories/manage-categories.component';


const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'admin/products', component: AdminPoductsComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'admin/products/pdt', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'admin/orders', component: ManageOrdersComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'admin/categories', component: ManageCategoriesComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AuthGuard, AdminAuthGard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'mycart', component: ShowCartComponent, canActivate: [AuthGuard] },
  { path: 'myorder', component: ShowOrderComponent, canActivate: [AuthGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: '**', component: NotFoundComponent },






];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
