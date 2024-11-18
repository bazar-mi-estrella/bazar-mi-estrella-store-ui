import { UserService } from '@/shared/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  isLoggin = sessionStorage.getItem('auth_id') ?? false;
  fullname: string = sessionStorage.getItem('name') ?? "";
  email: string = sessionStorage.getItem('email') ?? "";
  photo_url = sessionStorage.getItem('photo_url');

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  public genderSelectOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'others', text: 'Others' },
  ];

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
  }

  logout() {
    this.userService.logout()
      .then(() => this.router.navigate(['/pages/login']))
      .catch(err => console.log("Error al cerrar sesión:", err));
  }
}
