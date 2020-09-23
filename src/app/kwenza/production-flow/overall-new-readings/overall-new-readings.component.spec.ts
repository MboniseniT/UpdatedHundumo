import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallNewReadingsComponent } from './overall-new-readings.component';

describe('OverallNewReadingsComponent', () => {
  let component: OverallNewReadingsComponent;
  let fixture: ComponentFixture<OverallNewReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallNewReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallNewReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
