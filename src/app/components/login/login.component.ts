import { LoginVerify } from './../../model/login/login.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginRequest, LoginResponse } from 'src/app/model/login/login.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceMainService } from 'src/app/core/service/service-main.service';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import Swal from 'sweetalert2';
import { TestingResponse } from 'src/app/model/testing/testing.model';
import { ServiceNotificationsService } from 'src/app/core/service-notifications/service-notifications.service';
import { StorageService } from 'src/app/core/session/storage.service';
import { AccessService } from 'src/app/core/layout/access.service';
import { Session } from 'src/app/model/session/session.model';
import { QuestionsResult } from 'src/app/model/questions/questions.model';

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

  public _testingRequest !: TestingResponse;
  public _testingResponse!: TestingResponse;
  public _verifyTesting !:number;
  public _sessionResponse !: Session;
  public _sessionRequest !: Session;



  hide = true;
  @Output() headerEvent = new EventEmitter<boolean>();
  public headerEvetEmmiter = new BehaviorSubject<boolean>(true);

  constructor(private _storage: StorageService,
    private _accessService: AccessService,
    private router: Router,
    private _service: ServiceMainService,
    private _serviceConnection: ConeectionApiService,
    private _serviceNotification: ServiceNotificationsService) { }

  ngOnInit(): void {
    this._storage.logoutSession();
    this._service.headerEvetEmmiter.next(false);
    this._testingRequest = new TestingResponse;
    this._testingResponse = new TestingResponse;
    this._requestLogin = new LoginRequest();
    this._responseLogin = new LoginResponse();
    this._modelLogin = new LoginVerify();
    this._sessionRequest = new Session();
    this._sessionResponse = new Session();
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
      }
    } catch (e){

    }
  }

  public registerTesting(_datos: TestingResponse, _request: LoginResponse):void{
    this._serviceConnection.saveTesting(_datos).subscribe( { next: (_response) => {
      // console.log('TESTING REGISTER: ' + JSON.stringify(_response));
      this._testingResponse = _response;
      this._sessionRequest.fullNameUserIdentity = _request.fullName;
      this._sessionRequest.iduserIdentity = _request.idUser;
      this._sessionRequest.idTestingIdentity = this._testingResponse.ID_TESTING;
      this._sessionRequest.nameUserIdentity = _request.nameUser;
      this._sessionRequest.passUserIdentity = _request.passUser;
      this._sessionRequest.stateTestingIdentity = this._testingResponse.STATE;
      this._sessionRequest.tokenIdentity = this._accessService.GetToken();
      this._sessionRequest.dashboard = true;
      this.correctLogin(this._sessionRequest);
    }, error: (_error) => {
      console.log('ERROR TESTING REGISTER: ' + JSON.stringify(_error));
    }, complete: () => {
      console.log('TESTING REGISTER COMPLETE');
    }});
  }

  public getTestingVerify(idUser: number):void{
    this._serviceConnection.getTesting().subscribe({ next: (_response) => {
      _response.find(x => x.STATE == 'P' && x.ID_USER == idUser)?.ID_TESTING;
      console.log('JSON VERIFICACION STATUS: ' + JSON.stringify(_response));
    }, error: (_error) => {

    }, complete: () => {

    }});
  }
  public submitLogin(_request: LoginVerify):void{
    try {
      if(this.registerForm.invalid) { return; }
      this._serviceConnection.validateAuthorizate().subscribe({ next: (_response) => {
        const responseLogin =_response.find( x => x.nameUser == _request.usuario && x.passUser == _request.password);
        if (responseLogin != undefined){
          this.getTestingVerify(responseLogin.idUser);
          // console.log('USUARIO LOGUEADO: ' + JSON.stringify(responseLogin));
          this._serviceNotification.notificationsSimple('Usuario logueado correctamente.','success');
          this._testingRequest.ID_INTELLIGENSE = 9;
          this._testingRequest.ID_USER = responseLogin.idUser;
          this._testingRequest.STATE = 'P';
          this.registerTesting(this._testingRequest,responseLogin);
          // this.router.navigate(['/Dashboard']);
          this._service.headerEvetEmmiter.next(true);
        } else {
          this._serviceNotification.notificationsSimple('Usuario o password incorrecto.','error');
          this._service.headerEvetEmmiter.next(false);
        }
      }, error: (_error) => {
        this._serviceNotification.notificationsSimple('Se genero el siguiente error: ' + JSON.stringify(_error),'error');
      }, complete: () =>{
        // console.log('VALIDACION COMPLETA DE USUARIO');
      }});
    } catch(e){
      this._serviceNotification.notificationsSimple('Se genero el siguiente error: ' + e,'error');
    }
  }

  private correctLogin(_data: Session){
    // console.log('SESSION POR GENERADA: ' + JSON.stringify(_data));
    this._storage.setCurrentSession(_data);
    this._sessionResponse = this._storage.getCurrentSession();
    // console.log('SESSION GENERADA: ' + JSON.stringify(this._sessionResponse));
    this.router.navigate(['/Dashboard/Test']);
  }
}
