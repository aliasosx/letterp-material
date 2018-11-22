import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefoodtypeComponent } from './updatefoodtype.component';

describe('UpdatefoodtypeComponent', () => {
  let component: UpdatefoodtypeComponent;
  let fixture: ComponentFixture<UpdatefoodtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatefoodtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefoodtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
