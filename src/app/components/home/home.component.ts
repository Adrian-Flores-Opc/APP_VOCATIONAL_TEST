import { StorageService } from 'src/app/core/session/storage.service';
import { Component, OnInit } from '@angular/core';
import { ServiceMainService } from 'src/app/core/service/service-main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _service: ServiceMainService, private _storage: StorageService) { }

  ngOnInit(): void {
    this._storage.logoutSession();
    this._service.headerEvetEmmiter.next(false);
    
  }

}
