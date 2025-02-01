import { Constants } from '@/shared/classes/constants';
import { OrderService } from '@/shared/services/order.service';
import { SweetAlertService } from '@/shared/services/sweet-alert.service';
import { UserService } from '@/shared/services/user.service';
import { OrderTrayDTO } from '@/types/order-tray-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoadingPedidos = true;

  isLoggin = sessionStorage.getItem('auth_id') ?? false;
  fullname: string = sessionStorage.getItem('name') ?? "";
  email: string = sessionStorage.getItem('email') ?? "";
  photo_url = sessionStorage.getItem('photo_url');

  clientId: string = sessionStorage.getItem('client_id') ?? "";

  listpedidos: OrderTrayDTO[] = [];
  Constantes = Constants;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private sweetAlert: SweetAlertService,
    private orderService: OrderService
  ) { }

  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];


  ngOnInit(): void {
    this.initValues();
  }

  initValues() {
    forkJoin({
      listordenes: this.orderService.getByClientId(this.clientId),
    }).subscribe({
      next: (response) => {
        this.listpedidos = response.listordenes;
        this.isLoadingPedidos = false;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  /********************************** METODOS DE BOTONES ************************************/

  viewOrPayPedido(row: OrderTrayDTO) {
    this.router.navigate(["/shop/order", { idOrder: row.id }])
  }

  cancelPedido(row: OrderTrayDTO, index: number) {
    this.sweetAlert.confirm('¿Estás seguro de cancelar el pedido?').then(async (result) => {
      if (result) {
        try {
          this.isLoadingPedidos = true;
          await firstValueFrom(this.orderService.cancelOrder(row.id));  // Esperar la cancelación
          this.listpedidos = await firstValueFrom(this.orderService.getByClientId(this.clientId)) ?? [];
          let config = this.sweetAlert.getAlertConfig('1', 'Pedido cancelado con éxito');
          Swal.fire(config).then(() => { });
        } catch (error) {
          console.error('Error al cancelar el pedido:', error);
          this.sweetAlert.getAlertConfig('2', 'Error al cancelar el pedido');
        } finally {
          this.isLoadingPedidos = false;
        }
      }
    });
  }

  solitdRefund(row: OrderTrayDTO) {
    this.router.navigate(["/pages/refund-order", { idOrder: row.id }])
  }

  /************************* OTROS METODOS ******************************/
  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
  }

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['/pages/login']))
      .catch(err => console.log("Error al cerrar sesión:", err));
  }
}
