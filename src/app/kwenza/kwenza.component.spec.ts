import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KwenzaComponent } from './kwenza.component';

describe('KwenzaComponent', () => {
  let component: KwenzaComponent;
  let fixture: ComponentFixture<KwenzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KwenzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KwenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
