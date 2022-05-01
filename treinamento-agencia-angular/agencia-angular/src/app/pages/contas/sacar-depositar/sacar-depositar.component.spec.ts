import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarDepositarComponent } from './sacar-depositar.component';

describe('SacarDepositarComponent', () => {
  let component: SacarDepositarComponent;
  let fixture: ComponentFixture<SacarDepositarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacarDepositarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SacarDepositarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
