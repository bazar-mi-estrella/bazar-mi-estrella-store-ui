import { OrderService } from '@/shared/services/order.service';
import { OrderDTO } from '@/types/order-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  idOrder: string = this.activateRoute.snapshot.params?.['idOrder'];
  dataOrder: OrderDTO = {} as OrderDTO;
  isPagado: boolean = false;//Validar en caso la orden ya haya sido pagada

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getDataOrder();
  }

  getDataOrder(): void {
    this.orderService.findById(this.idOrder).subscribe(result => {
      this.dataOrder = result;
    });
  }


  payOrder(): void {
    console.log('dataOrder >>', this.dataOrder);
    this.router.navigate(['/shop/payment-order', {idOrder:this.idOrder}]);
  }


}
