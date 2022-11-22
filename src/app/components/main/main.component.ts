import { StorageService } from 'src/app/core/session/storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceMainService } from 'src/app/core/service/service-main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Output() elementNav = new EventEmitter<boolean>();
  constructor(private _service: ServiceMainService, private _storage: StorageService) { }

  ngOnInit(): void {
    this._service.headerEvetEmmiter.next(false);
    this._storage.logoutSession();
  }
}
