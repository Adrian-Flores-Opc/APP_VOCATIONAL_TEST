import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ServiceMainService } from './core/service/service-main.service';
import { StorageService } from './core/session/storage.service';
import { Session } from './model/session/session.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppVocationalTest';
  public identityLogin = true;
  public _sessionResponse !: Session;
  constructor(private _service: ServiceMainService, private router: Router, private _storage: StorageService){}

  ngOnInit(){
    this._storage.logoutSession();
    this._sessionResponse = new Session();
    // this._sessionResponse = this._storage.getCurrentSession();

    console.log('DASHBOARD MODULE ACTIVATE: ' + JSON.stringify(this._sessionResponse));

    // this._service.headerEvetEmmiter.next(false);
    // this._service.headerEvetEmmiter.subscribe(data => {
    //   console.log('DATO DEL METODO ESCUCHA: ' + data);
    //   if (data) {
    //     this.identityLogin = false;
    //   } else {
    //     this.identityLogin = true;
    //   }
    // });
  }
}
