import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallProductionComponent } from './overall-production.component';

describe('OverallProductionComponent', () => {
  let component: OverallProductionComponent;
  let fixture: ComponentFixture<OverallProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
