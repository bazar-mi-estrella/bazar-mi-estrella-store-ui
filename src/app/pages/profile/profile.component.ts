import { Constants } from '@/shared/classes/constants';
import { ClientService } from '@/shared/services/client.service';
import { OrderService } from '@/shared/services/order.service';
import { SweetAlertService } from '@/shared/services/sweet-alert.service';
import { FirebaseService } from '@/shared/services/firebase.service';
import { OrderTrayDTO } from '@/types/order-tray-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Client } from '@/types/client.interface';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; // Define el formulario
  passwordForm!: FormGroup;

  isLoadingPedidos = true;
  viewOtros: boolean = false;

  isLoggin = sessionStorage.getItem('auth_id') ?? false;
  fullname: string = sessionStorage.getItem('name') ?? "";
  emailClient: string = sessionStorage.getItem('email') ?? "";
  photo_url = sessionStorage.getItem('photo_url');

  clientId: string = sessionStorage.getItem('client_id') ?? "";
  dataClient: Client = {} as Client;
  listpedidos: OrderTrayDTO[] = [];
  Constantes = Constants;
  constructor(
    private readonly userService: FirebaseService,
    private readonly router: Router,
    private sweetAlert: SweetAlertService,
    private orderService: OrderService,
    private clientService: ClientService,
    private firebase: FirebaseService
  ) { }

  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];


  ngOnInit(): void {
    this.initForm();
    this.initFormPassword();
    this.initValues();
  }

  /************************************ METODOS INICIALES ********************************************/

  initForm() {
    this.profileForm = new FormGroup({
      username: new FormControl({ value: '', disabled: !this.viewOtros }, Validators.required),
      email: new FormControl({ value: '', disabled: !this.viewOtros }, [Validators.required, Validators.email]),
      phone: new FormControl({ value: '', disabled: !this.viewOtros }, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      address: new FormControl({ value: '', disabled: !this.viewOtros }, Validators.required),
    });
  }

  initFormPassword() {
    this.passwordForm = new FormGroup(
      {
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  initValues() {
    forkJoin({
      listordenes: this.orderService.getByClientId(this.clientId),
      dataClient: this.clientService.findById(this.clientId)
    }).subscribe({
      next: (response) => {
        this.listpedidos = response.listordenes;
        this.dataClient = response.dataClient;
        this.setDataClient(this.dataClient);
        this.isLoadingPedidos = false;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  setDataClient(client: Client) {
    this.username?.setValue(client.fullname);
    this.email?.setValue(client.email);
    this.phone?.setValue(client.phone);
    this.address?.setValue(client.address);
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

  confirmReceive(row: OrderTrayDTO) {
    this.sweetAlert.confirm('¿Estás seguro de confirmar la entrega del pedido?').then(async (result) => {
      if (result) {
        try {
          this.isLoadingPedidos = true;
          await firstValueFrom(this.orderService.confirmReceiveOrder(row.id));  // Esperar la cancelación
          this.listpedidos = await firstValueFrom(this.orderService.getByClientId(this.clientId)) ?? [];
          let config = this.sweetAlert.getAlertConfig('1', 'Confirmación realizada con éxito');
          Swal.fire(config).then(() => { });
        } catch (error) {
          console.error('Error al cancelar el pedido:', error);
          this.sweetAlert.getAlertConfig('2', 'Error al confirmar el pedido');
        } finally {
          this.isLoadingPedidos = false;
        }
      }
    });
  }


  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario enviado con éxito:', this.profileForm.value);
    } else {
      console.log('El formulario no es válido');
      this.profileForm.markAllAsTouched(); // Muestra los errores si el usuario no ha interactuado con todos los campos
    }
  }

  async onSubmitPassword() {
    if (this.passwordForm.valid) {
      console.log('Password updated successfully:', this.passwordForm.value);
      let message = await this.firebase.changePassword(this.newPassword?.value);
      console.log("Este es el mensaje de cambio de contra", message);
    } else {
      console.log('Form is invalid');
      this.passwordForm.markAllAsTouched(); // Muestra los errores si el usuario no ha interactuado con todos los campos
    }
  }

  /************************************************ OTROS METODOS ***************************************************/
  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
  }

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['/pages/login']))
      .catch(err => console.log("Error al cerrar sesión:", err));
  }

  // Custom Validator para comprobar si las contraseñas coinciden
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  /**************************************** METODOS GET ***********************************/

  get username() { return this.profileForm.get('username') }
  get email() { return this.profileForm.get('email') }
  get phone() { return this.profileForm.get('phone') }
  get address() { return this.profileForm.get('address') }

  // Getters para acceder a los controles en el template
  get oldPassword() { return this.passwordForm.get('oldPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }


}
