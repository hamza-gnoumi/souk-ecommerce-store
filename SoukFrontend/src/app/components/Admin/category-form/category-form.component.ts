import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  @Input()
  category: Category;

  @Output()
  submit: EventEmitter<Category> =
    new EventEmitter<Category>();
  @Output()
  cancel: EventEmitter<void> =
    new EventEmitter<void>();

  @Input()
  operation: 'create' | 'update' = 'create';

  title = 'New Category';

  get isCategoryValid(): boolean {
    return this.hasLength(this.category.name);


  }
  private hasLength(input: string | undefined): boolean {
    return input !== null && input !== undefined
      && input.length > 0;
  }

  onSubmit() {
    this.submit.emit(this.category);
  }
  onCancel() {
    this.cancel.emit();
  }
}



