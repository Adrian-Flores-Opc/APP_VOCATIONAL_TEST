import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/session/storage.service';
import { Session } from 'src/app/model/session/session.model';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  public _sessionResponse !: Session;
  constructor(private _storage: StorageService) { }

  ngOnInit(): void {
    this._sessionResponse = this._storage.getCurrentSession();
  }

}
