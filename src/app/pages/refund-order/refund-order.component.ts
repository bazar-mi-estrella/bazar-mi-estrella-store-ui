import { Constants } from '@/shared/classes/constants';
import { MasterService } from '@/shared/services/master.service';
import { OrderService } from '@/shared/services/order.service';
import { RefundService } from '@/shared/services/refund.service';
import { Master } from '@/types/master.interface';
import { OrderDTO } from '@/types/order-interface';
import { RefundPostDTO } from '@/types/refund-post-interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-refund-order',
  templateUrl: './refund-order.component.html',
  styleUrl: './refund-order.component.scss'
})
export class RefundOrderComponent implements OnInit {

  isLoading: boolean = true;
  public refundForm!: FormGroup;
  public formSubmitted = false;
  listMotivos: Master[] = [];
  idOrder: string = this.activateRoute.snapshot.params?.['idOrder'];


  constructor(
    private activateRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private masterService: MasterService,
    private refundService: RefundService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.initForm();
    this.initValues();
  }
  /******************************************** METODOS INICIALES ******************************************************/
  initForm() {
    this.refundForm = new FormGroup({
      codeorder: new FormControl({ value: null, disabled: true }, Validators.required),
      name: new FormControl({ value: null, disabled: true }, Validators.required),
      email: new FormControl({ value: null, disabled: true }, Validators.required),
      phone: new FormControl({ value: null, disabled: true }, Validators.required),
      reason: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  initValues() {
    forkJoin({
      dataOrder: this.orderService.findById(this.idOrder),
      motivos: this.masterService.findByPrefixAndCorrelatives(9)
    }).subscribe({
      next: (response) => {
        this.setDataOrder(response.dataOrder);
        this.listMotivos = response.motivos;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.error(`Error al cargar la data`);
      },
    });
  }

  async setDataOrder(order: OrderDTO): Promise<void> {
    this.codeorder?.setValue(order.code);
    this.name?.setValue(order.clientFullname);
    this.email?.setValue(order.clientEmail);
    this.phone?.setValue(order.phone);
  }

  /******************************************** METODOS DE ACCION ******************************************************/

  changeHandler(selectedOption: { id: string; name: string }) {
    // Update the 'country' form control with the selected option's value
    this.reason?.setValue(selectedOption.id);
  }



  /******************************************** METODO PARA ENVIAR FORMULARIO ******************************************/

  onSubmit() {
    this.formSubmitted = true;
    if (this.refundForm.valid) {
      this.isLoading = true;
      let dataSave: RefundPostDTO = {
        orderId: this.idOrder,
        reasonId: this.reason?.value,
        detail: this.message?.value
      }

      this.refundService.save(dataSave).subscribe(x => {
        if(x.code!=Constants.HTTP_STATUS_CORRECT){
          this.toastrService.error(`Ya ha realizado una solicitud para este pedido, por favor espere nuestra respuesta.`);
          this.isLoading = false;
          return;
        }
        this.toastrService.success(`Solicitud enviada correctamente, por favor, revisu su correo para más detalles.`);
        // Reset the form
        this.refundForm.reset();
        this.formSubmitted = false; // Reset formSubmitted to false
        this.isLoading = false;
        this.router.navigate(["/pages/profile"])
      });
    }
  }


  /******************************************** METODOS GET DEL FORMULARIO ******************************************/
  get codeorder() { return this.refundForm.get('codeorder') }
  get email() { return this.refundForm.get('email') }
  get name() { return this.refundForm.get('name') }
  get phone() { return this.refundForm.get('phone') }

  get reason() { return this.refundForm.get('reason') }
  get message() { return this.refundForm.get('message') }

}
