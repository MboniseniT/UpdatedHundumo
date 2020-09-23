import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReadingsEditvalueComponent } from './new-readings-editvalue.component';

describe('NewReadingsEditvalueComponent', () => {
  let component: NewReadingsEditvalueComponent;
  let fixture: ComponentFixture<NewReadingsEditvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReadingsEditvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReadingsEditvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
