import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly userService: UserService) { }
  ngOnInit(): void {
    this.userService.logout()
      .then((res) => {
        console.log("SUCCESS_LOGOUT_LOGIN_COMPONENT", res)
        sessionStorage.clear()
      }).catch((err) => console.log("ERROR_LOGOUT_LOGIN_COMPONENT", err));
  }

}
