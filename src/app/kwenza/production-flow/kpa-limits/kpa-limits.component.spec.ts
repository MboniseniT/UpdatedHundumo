import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpaLimitsComponent } from './kpa-limits.component';

describe('KpaLimitsComponent', () => {
  let component: KpaLimitsComponent;
  let fixture: ComponentFixture<KpaLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpaLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpaLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
