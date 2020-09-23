import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentLandingTypeComponent } from './assessment-landing-type.component';

describe('AssessmentLandingTypeComponent', () => {
  let component: AssessmentLandingTypeComponent;
  let fixture: ComponentFixture<AssessmentLandingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentLandingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentLandingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
