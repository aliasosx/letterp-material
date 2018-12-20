import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeFoodSelectComponent } from './subtype-food-select.component';

describe('SubtypeFoodSelectComponent', () => {
  let component: SubtypeFoodSelectComponent;
  let fixture: ComponentFixture<SubtypeFoodSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtypeFoodSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtypeFoodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
