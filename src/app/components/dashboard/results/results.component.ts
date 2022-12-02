import { Component, OnInit } from '@angular/core';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { StorageService } from 'src/app/core/session/storage.service';
import { IntelligenceResponse } from 'src/app/model/intelligence/intelligence.model';
import { Session } from 'src/app/model/session/session.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public _sessionResponse !: Session;

  public _responseIntelligence !: IntelligenceResponse;
  public _responseIntelligenseSiete !: IntelligenceResponse;
  constructor(private _storage: StorageService, private _serviceConnection: ConeectionApiService) { }

  ngOnInit(): void {
    this._sessionResponse = this._storage.getCurrentSession();
    if(this._sessionResponse.stateTestingIdentity === 'C'){
      if(this._sessionResponse.idInteligence != 0){
        this._serviceConnection.getIntelligenceById(this._sessionResponse.idInteligence).subscribe({ next: (_response) => {
          this._responseIntelligence = _response;
          this._serviceConnection.getIntelligenceById(this._sessionResponse.idInteligenceSiete).subscribe({ next: (_responseTwo) => {
            this._responseIntelligenseSiete = _responseTwo;
          }, error: (_error) => {

          }, complete: () => {

          }});

        }, error: (_error) => {

        }, complete:() => {

        }});
      } else {
        this._serviceConnection.getIntelligenceById(this._sessionResponse.idInteligence).subscribe({ next: (_response) => {
          this._responseIntelligence = _response;
        }, error: (_error) => {

        }, complete:() => {

        }});
      }
    }
  }

}

