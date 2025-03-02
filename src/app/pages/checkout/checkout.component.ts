import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '@/types/product-type';
import { UbigeoService } from '../../shared/services/ubigeo.service';
import { forkJoin } from 'rxjs';
import { Departamento } from '@/types/departamento.interface';
import { Provincia } from '@/types/provincia.interface';
import { Distrito } from '@/types/distrito.interface';
import { OrderService } from '../../shared/services/order.service';
import { OrderDetailPost } from '@/types/orden-detail-post.interface';
import { Router } from '@angular/router';
import { Constants } from '@/shared/classes/constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public checkoutForm!: FormGroup;
  public formSubmitted = false;
  isOpenLogin = false;
  isOpenCoupon = false;
  isLoading: boolean = true;//Loader para ver si esta cargando la data
  // shipCost: number = this.cartService.totalPriceQuantity().total >= 100 ? 0 : 20;//Costo de envio
  shipCost: number = 20;
  couponCode: string = '';
  payment_name: string = '';
  // sendFree: boolean = this.cartService.totalPriceQuantity().total >= 100;//Si el total es mayor a 100 el envio es gratis
  sendFree: boolean = false;//Si el total es mayor a 100 el envio es gratis

  produts: IProduct[] = [];
  departamentosList: Departamento[] = []
  provinciaList: Provincia[] = []
  distritoList: Distrito[] = []

  constructor(
    private router: Router,
    public cartService: CartService,
    private readonly orderService: OrderService,
    private readonly toastrService: ToastrService,
    private readonly ubigeoService: UbigeoService) { }


  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.produts = this.cartService.getCartProducts();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }


  initValues(): void {
    forkJoin({
      provincesList: this.ubigeoService.getProvincias(Constants.UUID_DEPARTAMENT_LAMBAYEQUE),
    }).subscribe({
      next: (response) => {
        this.provinciaList = response.provincesList;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (this.sendFree) return;
    this.shipCost = value as number;
  }

  public countrySelectOptions = [
    { value: 'select-country', text: 'Select Country' },
    { value: 'berlin-germany', text: 'Berlin Germany' },
    { value: 'paris-france', text: 'Paris France' },
    { value: 'tokiyo-japan', text: 'Tokiyo Japan' },
    { value: 'new-york-us', text: 'New York US' },
  ];

  changeHandlerDepartamento(selectedOption: { id: string; name: string }) {
    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      departamentoId: selectedOption.id
    });

    this.provinciaList = []
    this.distritoList = []

    this.ubigeoService.getProvincias(selectedOption.id).subscribe(res => {
      this.provinciaList = res
    })
  }

  changeHandlerProvincia(selectedOption: { id: string; name: string }) {

    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      provinciaId: selectedOption.id
    });

    //Limpiamos la lista de distritos
    this.distritoList = []
    this.checkoutForm.patchValue({
      distritoId: null
    });
    //Reseteamos el costo de envio
    this.sendFree = false;
    if (!this.shipCost) this.shipCost = 20;

    this.ubigeoService.getDistritos(selectedOption.id).subscribe(res => {
      this.distritoList = res
    })
  }

  changeHandler(selectedOption: { id: string; name: string }) {
    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      distritoId: selectedOption.id
    });

    if (Constants.LIST_DIST_SEND_FREE.includes(selectedOption.id)) {
      this.sendFree = true;
      this.shipCost = 0;
    } else {
      this.sendFree = false;
      if (!this.shipCost) this.shipCost = 20;
    }
  }

  handleCouponSubmit() {
    // Add coupon code handling logic here
    if (this.couponCode) {
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = ''
    }
  }

  // handle payment item
  handlePayment(value: string) {
    this.payment_name = value
  }






  initForm(): void {
    this.checkoutForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      numberdocument: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      clientId: new FormControl(sessionStorage.getItem('client_id'), [Validators.required]),
      listdetails: new FormControl([]),
      // departamentoId: new FormControl(null, Validators.required),
      provinciaId: new FormControl(null, Validators.required),
      distritoId: new FormControl(null, Validators.required)

    })
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.checkoutForm.valid) {
      let details = this.produts.map(x => this.formatProductsSave(x));
      if (!this.sendFree) details.push(this.addCostSend());
      this.listdetails?.setValue(details);
      this.isLoading = true;//Para que se muestre el loader
      this.orderService.save(this.checkoutForm.value).subscribe(data => {
        this.toastrService.success(`Pedido realizado correctamente`);
        // Reset the form
        this.checkoutForm.reset();
        this.formSubmitted = false; // Reset formSubmitted to false
        this.isLoading = false; //Para que se quite el loader
        localStorage.setItem("cart_products", JSON.stringify([])); // Limpiamos el carrito
        this.router.navigate(["/shop/order", { idOrder: data.data.id }])
      });

    }
  }


  saveOrder(): void {
    this.orderService.save(this.checkoutForm.value).subscribe(data => {
      this.router.navigate(["/shop/order", { idOrder: data.data.id }])
    })
  }


  formatProductsSave(product: IProduct): OrderDetailPost {
    return {
      unitprice: product.price,
      productId: product.id,
      quantity: product.orderQuantity ?? 0,
      description: '',
      type: 1
    };
  }

  //Añadir el costo de envio
  addCostSend(): OrderDetailPost {
    return {
      unitprice: this.shipCost,
      productId: '',
      quantity: 1,
      description: this.shipCost == 20 ? 'Envío normal a domicilio' : 'Envío express a domicilio',
      type: 2
    }
  }


  get listdetails() { return this.checkoutForm.get('listdetails') }

  get firstname() { return this.checkoutForm.get('firstname') }
  get lastname() { return this.checkoutForm.get('lastname') }
  get country() { return this.checkoutForm.get('country') }
  get numberdocument() { return this.checkoutForm.get('numberdocument') }
  get distritoId() { return this.checkoutForm.get('distritoId') }
  get address() { return this.checkoutForm.get('address') }
  get state() { return this.checkoutForm.get('state') }
  get zipCode() { return this.checkoutForm.get('zipCode') }
  get phone() { return this.checkoutForm.get('phone') }
  get orderNote() { return this.checkoutForm.get('orderNote') }
  get email() { return this.checkoutForm.get('email') }
}
