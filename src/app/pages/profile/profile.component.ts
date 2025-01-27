import { OrderService } from '@/shared/services/order.service';
import { UserService } from '@/shared/services/user.service';
import { OrderTrayDTO } from '@/types/order-tray-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoggin = sessionStorage.getItem('auth_id') ?? false;
  fullname: string = sessionStorage.getItem('name') ?? "";
  email: string = sessionStorage.getItem('email') ?? "";
  photo_url = sessionStorage.getItem('photo_url');

  clientId:string = sessionStorage.getItem('client_id') ?? "";

  listpedidos: OrderTrayDTO[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
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
        console.log('Response:', response);
        this.listpedidos = response.listordenes;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
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
