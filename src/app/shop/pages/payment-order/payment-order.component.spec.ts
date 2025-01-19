import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderComponent } from './payment-order.component';

describe('PaymentOrderComponent', () => {
  let component: PaymentOrderComponent;
  let fixture: ComponentFixture<PaymentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
