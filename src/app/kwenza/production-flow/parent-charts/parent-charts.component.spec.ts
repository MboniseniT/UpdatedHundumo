import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChartsComponent } from './parent-charts.component';

describe('ParentChartsComponent', () => {
  let component: ParentChartsComponent;
  let fixture: ComponentFixture<ParentChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
