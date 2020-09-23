import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReadingsComponent } from './new-readings.component';

describe('NewReadingsComponent', () => {
  let component: NewReadingsComponent;
  let fixture: ComponentFixture<NewReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
