import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { ServiceMainService } from 'src/app/core/service/service-main.service';
import { StorageService } from 'src/app/core/session/storage.service';
import { RegisterUser, RegisterUserRequest } from 'src/app/model/register/register-user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public registerForm!: UntypedFormGroup;
  public _modelRegister!: RegisterUser;
  public _requestUserRegister !: RegisterUserRequest;
  hide = true;
  constructor(private _service: ServiceMainService, private _serviceConnection: ConeectionApiService, private _storage: StorageService) { }

  ngOnInit(): void {
    this._storage.logoutSession();
    this._service.headerEvetEmmiter.next(false);
    this._modelRegister = new RegisterUser();
    this._requestUserRegister = new RegisterUserRequest;
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
    this._requestUserRegister.FullName = _request.fullName;
    this._requestUserRegister.Cellphone = _request.cellphone;
    this._requestUserRegister.Email = _request.email;
    this._requestUserRegister.DateOfBird = _request.dateOfBird;
    this._requestUserRegister.NameUser = _request.nameUser;
    this._requestUserRegister.PassUser = _request.password;
    this._requestUserRegister.RegistrationDate = '2022-11-15';
    this._serviceConnection.saveUserRegister(this._requestUserRegister).subscribe({ next: (_response) => {
      console.log('REGISTRO USUARIO: ' + JSON.stringify(_response));
      if (_response != undefined){
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Usuario Registrado Correctamente.'
        })
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'No se pudo registrar el usuario.'
        })
      }
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
      console.log('INFORMACION OBTENIDA CORRECTAMENTE');
    } });
  }
}
