import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinmakLandingComponent } from './binmak-landing.component';

describe('BinmakLandingComponent', () => {
  let component: BinmakLandingComponent;
  let fixture: ComponentFixture<BinmakLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinmakLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinmakLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
