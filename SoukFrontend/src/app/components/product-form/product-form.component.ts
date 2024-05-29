import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  isEditMode: boolean = false;

  product: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    img: '',
    categoryName: ''
  };
  categories$: Observable<Category[]>;
  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private messageService: MessageService) { }
  id;
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.productService.getProduct(this.id).subscribe((pdt) => this.product = pdt);
      this.isEditMode = true;
    }
    this.categories$ = this.categoryService.getCategories();
  }

  Cancel() {
    this.router.navigate(['/admin/products']);
  }
  onSubmit(form: any) {
    if (form.valid) {
      if (this.isEditMode) {
        // Update the existing product
        this.productService.updateProduct(this.id, this.product)
          .subscribe({
            next: () => {
              console.log('Product updated successfully')
              this.router.navigate(['/admin/products']);
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Rejected ',
                detail: `No changes were made to the product. Please update the details to make changes `
              });
            }
          });
      } else {
        // Add a new product
        this.productService.addProduct(this.product)
          .subscribe({
            next: () => {
              console.log('Product added successfully');
              this.router.navigate(['/admin/products']);
            },
            error: (error) => console.error(error)
          });
      }
    }
  }
}
