import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentLandingComponent } from './assessment-landing.component';

describe('AssessmentLandingComponent', () => {
  let component: AssessmentLandingComponent;
  let fixture: ComponentFixture<AssessmentLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
