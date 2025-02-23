import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '@/shared/services/email.service';
import { Constants } from '@/shared/classes/constants';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public contactForm!: FormGroup;
  public formSubmitted = false;
  isLoading: boolean = false;

  constructor(private toastrService: ToastrService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      this.isLoading = true;
      let asunto= this.subject?.value + ' - ' + this.email?.value;
      this.emailService.sendMessage(Constants.EMAIL_COMPANY, this.email?.value,
        asunto, this.message?.value).subscribe(() => {
          this.toastrService.success(`Mensaje enviado correctamente`);
          // Reset the form
          this.contactForm.reset();
          this.formSubmitted = false; // Reset formSubmitted to false
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          this.toastrService.error(`Error al enviar el mensaje`);
        })
    }
  }

  get name() { return this.contactForm.get('name') }
  get email() { return this.contactForm.get('email') }
  get subject() { return this.contactForm.get('subject') }
  get message() { return this.contactForm.get('message') }
}
