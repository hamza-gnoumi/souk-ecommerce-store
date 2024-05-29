import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { UserDto } from 'src/app/models/user-dto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[];
  categories: Category[];
  category;
  filteredProducts: Product[];
  cart: Cart;
  user: UserDto;
  constructor(private productService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))
    this.findProducts();
    this.findAllCategories();
  }


  private findAllCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => this.categories = data
    })
  }
  private findProducts() {
    this.productService.findAll().pipe(switchMap(products => {
      this.filteredProducts = this.products = products;
      return this.route.queryParamMap;
    })).subscribe(parms => {
      this.category = parms.get('category');
      this.applyFilter();

    });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.categoryName.includes(this.category.toLowerCase())) : this.products;
  }
  onOptionSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue)
      this.router.navigate([], {
        queryParams: { category: selectedValue }
      });
    else
      this.router.navigate([]);
  }
}
