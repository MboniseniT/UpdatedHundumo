import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpaComponent } from './kpa.component';

describe('KpaComponent', () => {
  let component: KpaComponent;
  let fixture: ComponentFixture<KpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
