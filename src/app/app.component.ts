import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-shofy';

  constructor(private readonly auth: Auth) {

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

        console.log('User logged in:', user);
        console.log('User ID:', user.uid);
        console.log('Email:', user.email);
      } else {
        console.log('No user is signed in.');
        sessionStorage.clear();
      }
    });
  }
}
