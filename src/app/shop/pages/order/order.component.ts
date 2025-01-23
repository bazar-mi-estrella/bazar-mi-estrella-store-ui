import { Constants } from '@/shared/classes/constants';
import { OrderService } from '@/shared/services/order.service';
import { OrderDTO } from '@/types/order-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  idOrder: string = this.activateRoute.snapshot.params?.['idOrder'];
  idSession: string = this.activateRoute.snapshot.params?.['session_payment_id'];

  dataOrder: OrderDTO = {} as OrderDTO;
  isPagado: boolean = false;//Validar en caso la orden ya haya sido pagada
  isLoading: boolean = true;
  stripePromise = loadStripe(environment.CLAVE_STRIPE); // Tu clave pública


  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getDataOrder();
    // this.getDataSesionStripe();
  }

  async getDataOrder(): Promise<void> {
    if (this.idSession) await this.orderService.getSesionStripe(this.idSession, this.idOrder).toPromise();
    this.orderService.findById(this.idOrder).subscribe(result => {
      this.dataOrder = result;
      if (this.dataOrder.statepagoId === Constants.ESTADO_PAGO_PAGADO) this.isPagado = true;
      this.isLoading = false;
    });
  }

  // getDataSesionStripe(): void {
  //   if(!this.idSession) return;
  //   this.orderService.getSesionStripe(this.idSession).subscribe(result => {
  //     console.log('data de la sesión >>', result);
  //   });
  // }


  // payOrder(): void {
  //   console.log('dataOrder >>', this.dataOrder);
  //   this.router.navigate(['/shop/payment-order', {idOrder:this.idOrder}]);
  // }

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
      const response = await this.orderService.createSesionStripe(this.idOrder).toPromise();

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
