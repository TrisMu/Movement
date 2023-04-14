import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Validation from "../../../app/utilities/validation"
import { Profile, SupabaseService } from 'src/services/supabase.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})





export class LoginComponent {


  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  loading = false

  constructor(private formBuilder: FormBuilder,
    private readonly supabase: SupabaseService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: [
          '',
          [
            Validators.required,

          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));


    try {
      this.loading = true
      const email = this.form.value.email as string
      const password = this.form.value.password as string
      const firstname = this.form.value.firstname as string
      const lastname = this.form.value.lastname as string



      console.log(lastname, firstname)

      const newUser: Profile = {
        email:email,
        password :password,
        first_name:firstname,
        last_name:lastname
      }
      

      const { error }= await this.supabase.registerProfile(newUser)  
      if (error) throw error
      alert('Bitte bestätige deine Email. Wir haben dir einen link zugeschickt')

      this.updateuserCredentials(newUser)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.form.reset()
      this.loading = false
      
    }

  
  }
  async updateuserCredentials(user: Profile){

  const {error} =  await this.supabase.updateuserCred(user)
  console.log(error)
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}



