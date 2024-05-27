import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoductsComponent } from './admin-poducts.component';

describe('AdminPoductsComponent', () => {
  let component: AdminPoductsComponent;
  let fixture: ComponentFixture<AdminPoductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPoductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPoductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
