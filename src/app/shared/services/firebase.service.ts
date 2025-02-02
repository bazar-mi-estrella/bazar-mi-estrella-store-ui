import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updatePassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private readonly auth: Auth) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  async changePassword(newPassword: string) {
    const user = this.auth.currentUser; // Obtener usuario autenticado
    if (user) {
      try {
        await updatePassword(user, newPassword);
        return 'Contraseña actualizada exitosamente.';
      } catch (error) {
        return this.handleError(error);
      }
    } else {
      return 'No hay un usuario autenticado.';
    }
  }

  private handleError(error: any): string {
    switch (error.code) {
      case 'auth/requires-recent-login':
        return 'Debes volver a iniciar sesión antes de cambiar la contraseña.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      default:
        return 'Error al cambiar la contraseña.';
    }
  }



}