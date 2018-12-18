import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsubtypeComponent } from './foodsubtype.component';

describe('FoodsubtypeComponent', () => {
  let component: FoodsubtypeComponent;
  let fixture: ComponentFixture<FoodsubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodsubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
