import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSetupComponent } from './asset-setup.component';

describe('AssetSetupComponent', () => {
  let component: AssetSetupComponent;
  let fixture: ComponentFixture<AssetSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
