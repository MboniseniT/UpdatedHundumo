import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReadingsComponent } from './edit-readings.component';

describe('EditReadingsComponent', () => {
  let component: EditReadingsComponent;
  let fixture: ComponentFixture<EditReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
