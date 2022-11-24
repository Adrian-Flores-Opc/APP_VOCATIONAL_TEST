import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { ServiceNotificationsService } from 'src/app/core/service-notifications/service-notifications.service';
import { ServiceMainService } from 'src/app/core/service/service-main.service';
import { StorageService } from 'src/app/core/session/storage.service';
import { RegisterUser, RegisterUserRequest } from 'src/app/model/register/register-user.model';
import { formatDate } from '@angular/common';


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
  constructor(private _service: ServiceMainService, 
    private _serviceConnection: ConeectionApiService, 
    private _storage: StorageService,
    private _serviceNotification: ServiceNotificationsService) { }

  ngOnInit(): void {
    this._storage.logoutSession();
    this._service.headerEvetEmmiter.next(false);
    this._modelRegister = new RegisterUser();
    this._requestUserRegister = new RegisterUserRequest;
    this.registerForm = new UntypedFormGroup({
      fullnameRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      emailRegister: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4), Validators.email] ),
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
    this._requestUserRegister.RegistrationDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
    if(_request.password != _request.verifyPassword){
      this._serviceNotification.notificationsSimple('La contraseña no es igual a la ingresada en el campo "repetir contraseña".','info');
    } else {
      this._serviceConnection.saveUserRegister(this._requestUserRegister).subscribe({ next: (_response) => {
        if (_response != undefined){
          this._serviceNotification.notificationsSimple('Usuario Registrado Correctamente.', 'success');
        } else {
          this._serviceNotification.notificationsSimple('No se pudo registrar el usuario.','error');
        }
      }, error: (_error) => {
        console.log('ERROR: ' + _error);
      }, complete:() => {
        console.log('INFORMACION OBTENIDA CORRECTAMENTE');
      } });
    }
  }
}
