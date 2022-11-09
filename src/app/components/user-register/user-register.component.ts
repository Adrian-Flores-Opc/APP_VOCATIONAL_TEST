import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/model/register/register-user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public registerForm!: UntypedFormGroup;
  public _modelRegister!: RegisterUser;
  hide = true;
  constructor() { }

  ngOnInit(): void {
    this._modelRegister = new RegisterUser();
    this.registerForm = new UntypedFormGroup({
      fullnameRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      emailRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      cellphoneRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      dateOfBirdRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      nameUserRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      passwordRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      verifyPasswordRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] )
    });
  }

  submitUserRegister(_request: RegisterUser){

  }
}
