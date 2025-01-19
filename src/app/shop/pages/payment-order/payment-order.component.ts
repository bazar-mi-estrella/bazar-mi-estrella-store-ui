import { OrderService } from '@/shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { loadStripe, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrl: './payment-order.component.scss'
})
export class PaymentOrderComponent implements OnInit {


  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripePromise = loadStripe(environment.CLAVE_STRIPE); // Tu clave pública


  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {

  }

  async payOrder(): Promise<void> {
    // Cargar el objeto Stripe
    const stripe = await this.stripePromise;
  
    // Asegúrate de que Stripe se cargó correctamente
    if (!stripe) {
      console.error('Stripe no se pudo cargar.');
      return;
    }
  
    try {
      // Llamar al backend de Spring Boot para crear la sesión de Stripe Checkout
      const response = await this.orderService.createSesionStripe().toPromise();
  
     // Extraer el sessionId del objeto recibido
     const sessionId = response?.data ?? '';//Lo hago asi pq angular interpreta que puede venir null, pero siempre va a venir un string

     // Redirigir a Stripe Checkout
     const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error('Error redirigiendo a Stripe Checkout:', result.error.message);
      }
    } catch (error) {
      console.error('Error durante el flujo de pago:', error);
    }
  }
  

}
