import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  categories: Category[];
  display = false;
  operation: 'update' | 'create' = 'create';
  category: Category = {
    name: ""
  };

  constructor(private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }
  ngOnInit(): void {
    this.findAllCategories();
  }

  private findAllCategories() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (data) => {
          this.categories = data;
        }
      });
  }
  createCategory() {
    this.display = true;
    this.category = {};
    this.operation = 'create';
  }
  save(cat: Category) {
    if (this.operation === 'create') {
      this.categoriesService.createCategory(cat).subscribe({
        next: () => {
          this.findAllCategories();
          this.display = false;
          this.category = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Customer saved',
            detail: `Customer ${cat.name} was successfully saved`
          });

        }
      });
    } else {
      this.categoriesService.updateCategory(cat.id, cat)
        .subscribe({
          next: () => {
            this.findAllCategories();
            this.display = false;
            this.category = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Customer updated',
              detail: `Customer ${cat.name} was successfully updated`
            });
          }
        })
    }

  }
  deleteCategory(category: Category) {
    this.confirmationService.confirm({
      header: 'Delete Category',
      message: `Are you sure you want to delete ${category.name}? You can't undo this afterwards.`,

      accept: () => {
        this.categoriesService.deleteCategory(category.id)
          .subscribe({
            next: () => {
              this.findAllCategories();
              this.messageService.add({
                severity: 'success',
                summary: 'Category deleted',
                detail: `Category ${category.name} was successfully deleted`
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

  updateCategory(UpdatedCategory: Category) {
    this.display = true;
    this.category = UpdatedCategory;
    this.operation = 'update'
  }
  cancel($event: void) {
    this.display = false;
    this.category = {};
  }
}
