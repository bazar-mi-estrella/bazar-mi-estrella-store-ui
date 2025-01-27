import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ClientService } from './shared/services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-shofy';

  constructor(private readonly auth: Auth, private readonly clientService: ClientService) {


  }

  ngOnInit(): void {
    console.log("auth", this.auth)

    // Escuchar cambios en el estado del usuario
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        sessionStorage.setItem('user_id', user.uid)
        sessionStorage.setItem('email', user.email ?? "")
        sessionStorage.setItem('photo_url', user.photoURL ?? "")
        sessionStorage.setItem('auth_id', user.uid ?? "")
        sessionStorage.setItem('name', user.displayName ?? "")
        this.findByEmail(user.email);
      } else {
        console.log('No user is signed in.');
        sessionStorage.clear();
      }
    });
  }

  findByEmail(email: string | null) {
    if (!email) return sessionStorage.clear()
    this.clientService.findByEmail(email).subscribe(res => {
      sessionStorage.setItem('client_id', res.id)
    })
  }
}
