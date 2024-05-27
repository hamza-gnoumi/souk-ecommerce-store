import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPoductsComponent } from './components/admin-poducts/admin-poducts.component';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'admin/products', component: AdminPoductsComponent },
  { path: 'admin/products/pdt', component: ProductFormComponent },
  { path: 'admin/products/:id', component: ProductFormComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'blog', component: BlogComponent },

  { path: '**', component: NotFoundComponent },






];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
