import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrestaurantPage } from './editrestaurant.page';

describe('EditrestaurantPage', () => {
  let component: EditrestaurantPage;
  let fixture: ComponentFixture<EditrestaurantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrestaurantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
