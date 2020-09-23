import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionFlowComponent } from './production-flow.component';

describe('ProductionFlowComponent', () => {
  let component: ProductionFlowComponent;
  let fixture: ComponentFixture<ProductionFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
