import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenMonitorComponent } from './kitchen-monitor.component';

describe('KitchenMonitorComponent', () => {
  let component: KitchenMonitorComponent;
  let fixture: ComponentFixture<KitchenMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
