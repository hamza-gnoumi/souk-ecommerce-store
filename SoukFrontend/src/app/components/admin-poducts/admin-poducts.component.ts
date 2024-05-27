import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-poducts',
  templateUrl: './admin-poducts.component.html',
  styleUrls: ['./admin-poducts.component.css']
})
export class AdminPoductsComponent implements OnInit {
  products!: Product[];
  constructor(private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAllProducts();
  }

  private findAllProducts() {
    this.productService.findAll()
      .subscribe({
        next: (data) => {
          this.products = data;
        }
      })
  }
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      header: 'Delete product',
      message: `Are you sure you want to delete ${product.name}? You can't undo this afterwards.`,
      accept: () => {
        this.productService.deleteProduct(product.id)
          .subscribe({
            next: () => {
              this.findAllProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'product deleted',
                detail: `product ${product.name} was successfully deleted`
              });
            }
          });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

}
