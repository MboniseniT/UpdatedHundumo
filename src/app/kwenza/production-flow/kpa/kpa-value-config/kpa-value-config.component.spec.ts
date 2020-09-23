import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpaValueConfigComponent } from './kpa-value-config.component';

describe('KpaValueConfigComponent', () => {
  let component: KpaValueConfigComponent;
  let fixture: ComponentFixture<KpaValueConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpaValueConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpaValueConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
