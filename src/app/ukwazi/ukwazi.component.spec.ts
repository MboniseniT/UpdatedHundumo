import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkwaziComponent } from './ukwazi.component';

describe('UkwaziComponent', () => {
  let component: UkwaziComponent;
  let fixture: ComponentFixture<UkwaziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkwaziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkwaziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
