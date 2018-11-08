import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfoodFormComponent } from './addfood-form.component';

describe('AddfoodFormComponent', () => {
  let component: AddfoodFormComponent;
  let fixture: ComponentFixture<AddfoodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfoodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
