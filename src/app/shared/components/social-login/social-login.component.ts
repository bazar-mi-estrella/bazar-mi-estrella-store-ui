import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCredential } from '@angular/fire/auth';
import { ClientService } from '../../services/client.service';
import { Client } from '@/types/client.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent {

  constructor(private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }



  singIn() {
    let returnUrl = this.route.snapshot.params['returnUrl'] || '/';

    console.log("returnUrl: ", returnUrl);

    this.userService.loginWithGoogle()
      .then(response => {
        console.log("response-->", response);
        this.router.navigate([returnUrl])
        this.saveCLient(response)
      })
      .catch(error => console.log("ERROR->", error))
  }

  saveCLient(response: UserCredential): void {
    let data: Client = {
      id: "",
      idfirebase: response.user.uid,
      fullname: response.user.displayName ?? "",
      email: response.user.email ?? "",
      photo: response.user.photoURL ?? ""
    }
    this.clientService.save(data).subscribe(res => {
      console.log("data del client, ",res);
      sessionStorage.setItem("client_id", res.data.id)
    })
  }
}
