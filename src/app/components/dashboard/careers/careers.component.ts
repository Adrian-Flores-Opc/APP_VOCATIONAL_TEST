import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/session/storage.service';
import { Session } from 'src/app/model/session/session.model';
import { CareersModel, CareersResponse } from 'src/app/model/careers/careers.model';
import { UniversitiesResponse } from 'src/app/model/universities/universities.model';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  public _sessionResponse !: Session;
  public _careersResponse !: CareersResponse[];
  public _careersAdd !: CareersModel;
  public _carrersModel !: CareersModel[];
  public _universitiesModel !: UniversitiesResponse[];
  public _universitiesAdd !: UniversitiesResponse;



  public _carrersModelDistinc !: CareersResponse[];
  constructor(private _storage: StorageService, private _serviceConnection: ConeectionApiService) { }

  ngOnInit(): void {
    this._careersAdd = new CareersModel();
    this._universitiesAdd = new UniversitiesResponse();
    this._sessionResponse = this._storage.getCurrentSession();
    if(this._sessionResponse.stateTestingIdentity === 'C'){
      this._serviceConnection.getCareers().subscribe({ next: (_response) => {
        this._careersResponse = _response.filter(x => x.ID_INTELLIGENSE === this._sessionResponse.idInteligence);
        this.getUniversitiesByCareers(this._careersResponse);
      }, error: (_error) => {

      }, complete:() =>{

      }});
    }
  }


  public getUniversitiesByCareers(_dato: CareersResponse[]):void{
    console.log('CARRERAS: ' + JSON.stringify(_dato));
    this._carrersModelDistinc = _dato.filter((n, i) => _dato.indexOf(n) === i);
    console.log('CARRERAS FILTRADAS: ' + JSON.stringify(this._carrersModelDistinc));
    this._carrersModelDistinc.forEach( element => {
      this._careersAdd.CAREERS = element;
      _dato.forEach( item => {
        if (this._careersAdd.CAREERS.CAREERS === item.CAREERS) {
          this._serviceConnection.getUniversitiesById(item.ID_UNIVERSITIES).subscribe({ next: (_response) => {
            this._careersAdd.UNIVERSITIES.push(_response);
          }, error: (_error) => {
    
          }, complete:() =>{
    
          }});
        }
      });
      this._carrersModel.push(this._careersAdd);
    });

    console.log('LISTADO DE CARRERAS FINAL: ' + JSON.stringify(this._carrersModel));
  }
}
