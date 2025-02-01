import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // ✅ Alerta de confirmación (Sí / No) que devuelve `true` o `false`
  confirm(
    title: string,
    message: string = '',
    confirmButtonText: string = 'Sí',
    cancelButtonText: string = 'No'
  ): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => result.isConfirmed);
  }

  getAlertConfig(code: string, message: string): SweetAlertOptions {
    let title = code == '1' ? 'Exitoso' : 'Advertencia'
    return {
      title: title,         // Parámetro dinámico para el título
      text: message,        // Parámetro dinámico para el mensaje
      width: 400,
      icon: code == '1' ? 'success' : 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'black',
      allowOutsideClick: false, // No permite cerrar haciendo clic fuera
      allowEscapeKey: false,
      customClass: {
        title: 'small-title',
        popup: 'small-popup',
        confirmButton: 'small-button'
      }
    };
  };


}
