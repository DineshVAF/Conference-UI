import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform: FormGroup | any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { 
    this.RegisterValidation();
  }

  // valid(email: string, Cemail: string) {
  //   return (controls: AbstractControl) => {
  //     const emailcontrol = controls.get(email);
  //     const cemailControl = controls.get(Cemail);

  //     if (cemailControl?.errors && !cemailControl.errors['matching']) {
  //       return null;
  //     }

  //     if (emailcontrol?.value !== cemailControl?.value) {
  //       controls.get(Cemail)?.setErrors({ matching: true });
  //       return { matching: true };
  //     } else {
  //       return null;
  //     }
  //   };
  // }

  // emailControl(): FormControl {
  //   return this.registerform.controls.get('email') as FormControl;
  // }
  // cemailControl(): FormControl {
  //   return this.registerform.controls.get('Cemail') as FormControl;
  // }

  // valid() {
  //   if (this.emailControl().value.errors && this.cemailControl().value.errors['matching']) {
  //     return null;
  //   }

  //   if (this.emailControl().value !== this.cemailControl().value) {
  //     this.registerform.controls.get('Cemail').setErrors({ matching: true })
  //     return { matching: true };
  //   } else {
  //     return null;
  //   }
  // }


  passvalid(password: string, Cpass: string) {
    return (controls: AbstractControl) => {
      const passcontrol = controls.get(password);
      const cpassControl = controls.get(Cpass);

      if (cpassControl?.errors && !cpassControl.errors['matching']) {
        return null;
      }

      if (passcontrol?.value !== cpassControl?.value) {
        controls.get(Cpass)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  RegisterValidation() {   
    this.registerform = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z -]+$'),UsernameValidator.cannotContainSpace]],
      email: ["", [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,16}')]],
      Cpass: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    },
      {
        validators: [this.passvalid('password', 'Cpass',)],
      },
    )

    // account_validation_messages = {
    //   'username': [
    //     { type: 'required', message: 'Username is required' },
    //     { type: 'minlength', message: 'Username must be at least 5 characters long' },
    //     { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    //     { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    //     { type: 'validUsername', message: 'Your username has already been taken' }
    //   ],
    //   'email': [
    //     { type: 'required', message: 'Email is required' },
    //     { type: 'pattern', message: 'Enter a valid email' }
    //   ],
    //   'confirm_password': [
    //     { type: 'required', message: 'Confirm password is required' },
    //     { type: 'areEqual', message: 'Password mismatch' }
    //   ],
    //   'password': [
    //     { type: 'required', message: 'Password is required' },
    //     { type: 'minlength', message: 'Password must be at least 5 characters long' },
    //     { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    //   ],
    //   'terms': [
    //     { type: 'pattern', message: 'You must accept terms and conditions' }
    //   ]
  }
  Submit() {
    console.log(this.registerform.value);
  }
}
export class UsernameValidator {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).indexOf(' ') >= 0){
          return {cannotContainSpace: true}
      }

      return null;
  }
}

