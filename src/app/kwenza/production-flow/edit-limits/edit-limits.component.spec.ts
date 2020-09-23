import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLimitsComponent } from './edit-limits.component';

describe('EditLimitsComponent', () => {
  let component: EditLimitsComponent;
  let fixture: ComponentFixture<EditLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
