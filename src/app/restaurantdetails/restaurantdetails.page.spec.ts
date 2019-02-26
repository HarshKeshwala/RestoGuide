import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantdetailsPage } from './restaurantdetails.page';

describe('RestaurantdetailsPage', () => {
  let component: RestaurantdetailsPage;
  let fixture: ComponentFixture<RestaurantdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
