import { LoginVerify } from './../../model/login/login.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginRequest, LoginResponse } from 'src/app/model/login/login.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServiceMainService } from 'src/app/core/service/service-main.service';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _requestLogin!: LoginRequest;
  public _responseLogin!: LoginResponse;
  public desblock = false;
  public _modelLogin!: LoginVerify;
  public registerForm!: UntypedFormGroup;
  hide = true;
  @Output() headerEvent = new EventEmitter<boolean>();
  public headerEvetEmmiter = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private _service: ServiceMainService, private _serviceConnection: ConeectionApiService) { }

  ngOnInit(): void {
    this._service.headerEvetEmmiter.next(false);
    this._requestLogin = new LoginRequest();
    this._responseLogin = new LoginResponse();
    this._modelLogin = new LoginVerify();
    this.registerForm = new UntypedFormGroup({
      usuarioLogin: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] ),
      passwordLogin: new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(4)] )
    });
  }

  get f(){ return this.registerForm.controls ; }

  senValidation(dato:boolean){
    this.headerEvent.emit(dato);
  }


  public async recuperarPassword():Promise<void>{
    try {
      const {value: email} = await Swal.fire({
        title: 'Ingrese el correo electronico registrado con su cuenta',
        input: 'email',
        inputPlaceholder:'Ingrese su correo',
        confirmButtonText:'Recuperar cuenta',
        validationMessage: 'Formato de correo invalido.'
      })
      if (email) {
        Swal.fire('Cuenta recuperada correctamente.');
        console.log('CORREO ELECTRONICO PARA VERIFICAR: ' + email);
      }
    } catch (e){

    }
  }

  public submitLogin(_request: LoginVerify):void{
    try {
      if(this.registerForm.invalid) { return; }
      this._serviceConnection.validateAuthorizate().subscribe({ next: (_response) => {
        const responseLogin =_response.find( x => x.nameUser == _request.usuario && x.passUser == _request.password);
        if (responseLogin != undefined){
          this.router.navigate(['/Dashboard']);
          this._service.headerEvetEmmiter.next(true);
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
            title: 'Usuario logueado correctamente.'
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
            title: 'Usuario o password incorrecto.'
          })
          this._service.headerEvetEmmiter.next(false);
        }
      }, error: (_error) => {
        console.log('ERROE EN EL INICIO DE SESSION ' + _error);
      }, complete: () =>{
        console.log('VALIDACION COMPLETA DE USUARIO');
      }});
    } catch(e){

    }
  }
}
