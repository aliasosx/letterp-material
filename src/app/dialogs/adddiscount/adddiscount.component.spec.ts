import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddiscountComponent } from './adddiscount.component';

describe('AdddiscountComponent', () => {
  let component: AdddiscountComponent;
  let fixture: ComponentFixture<AdddiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
