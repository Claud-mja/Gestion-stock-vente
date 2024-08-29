import { AuthenticationService } from '@/app/core/service/auth.service'
import { login } from '@/app/store/authentication/authentication.actions'
import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  submitted: boolean = false
  resrequest: string = "";
  resrequestClass: string = "text-danger";

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['user@demo.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      caisse: ['Caisse', [Validators.required]],
      saveMe: [false, [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }

  login(e: any) {
    e.preventDefault();
    this.submitted = true
    this.resrequest = ""
    this.resrequestClass = "text-danger"
    if (this.signInForm.valid) {
      const email = this.formValues['email'].value
      const password = this.formValues['password'].value

      this.authService.login(email, password).subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.resrequest = 'Connexion échouée, réessayer plus tard';
          }
          this.submitted = false
        },
        error: (err) => {
          console.error('Login failed!', err);
          this.submitted = false
        },
      });
    } else {
      for (const controlName in this.signInForm.controls) {
        if (this.signInForm.controls.hasOwnProperty(controlName)) {
          const control = this.signInForm.get(controlName);
          if (control && control.invalid) {
            const firstErrorKey = (control.errors && Object.keys(control.errors)[0]) as string;
            switch (firstErrorKey) {
              case 'required':
                this.resrequest = `Assurez vous de bien remplir les informations`;
                break;
              case 'email':
                this.resrequest = `Veuillez entrer une adresse email valide.`;
                break;
              default:
                this.resrequest = `Valeur invalide pour ${controlName}.`;
                break;
            }
            break;
          }
        }
      }
      this.submitted = false
      return;
    }
  }
}
