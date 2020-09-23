import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdConfigurationComponent } from './prod-configuration.component';

describe('ProdConfigurationComponent', () => {
  let component: ProdConfigurationComponent;
  let fixture: ComponentFixture<ProdConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
