import { LoginVerify } from './../../model/login/login.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginRequest, LoginResponse } from 'src/app/model/login/login.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServiceMainService } from 'src/app/core/service/service-main.service';

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

  constructor(private router: Router, private _service: ServiceMainService) { }

  ngOnInit(): void {
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

  public submitLogin(_request: LoginVerify):void{
    try {
      if(this.registerForm.invalid) { return; }
      if(_request.usuario == 'ADRIAN' && _request.password == 'ADRIAN'){
        this.router.navigate(['/Dashboard']);
        this._service.headerEvetEmmiter.next(true);
      }
      else {
        this._service.headerEvetEmmiter.next(false);
      }
    } catch(e){

    }
  }
}
