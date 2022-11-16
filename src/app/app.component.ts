import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ServiceMainService } from './core/service/service-main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppVocationalTest';
  public identityLogin = true;
  constructor(private _service: ServiceMainService, private router: Router){}
  ngOnInit(){
    console.log('URL MAIN: ' + this.router.url);
    this._service.headerEvetEmmiter.next(false);
    this._service.headerEvetEmmiter.subscribe(data => {
      console.log('DATO DEL METODO ESCUCHA: ' + data);
      if (data) {
        this.identityLogin = false;
      } else {
        this.identityLogin = true;
      }
    });
  }
}
