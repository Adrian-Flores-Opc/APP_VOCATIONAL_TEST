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
  public _carrersModel: CareersModel[] = [];
  public _universitiesModel !: UniversitiesResponse[];
  public _universitiesAdd !: UniversitiesResponse;
  public _careersFilter !: CareersResponse[];

  public _careersVerifyAdd !: CareersResponse[];

  public _carrersModelDistinc !: CareersResponse[];



  public _carrersModelResponse: CareersModel[] = [];
  public _universitiesResponse !: UniversitiesResponse;
  constructor(private _storage: StorageService, private _serviceConnection: ConeectionApiService) {
   }

  
  ngOnInit(): void {
    this._universitiesResponse = new UniversitiesResponse();
    this._careersAdd = new CareersModel();
    this._universitiesAdd = new UniversitiesResponse();
    this._sessionResponse = this._storage.getCurrentSession();
    if(this._sessionResponse.stateTestingIdentity === 'P'){
      this._serviceConnection.getCareers().subscribe({ next: (_response) => {
        this._careersResponse = _response.filter(x => x.ID_INTELLIGENSE === this._sessionResponse.idInteligence);
        this._carrersModelResponse = this.getUniversitiesByCareers(this._careersResponse);
        console.log('RESPONSE FINAL CARRERAS: ' + JSON.stringify(this._carrersModelResponse));
        console.log('LISTA FINAL DE CARRERAS: ' + JSON.stringify(this._carrersModel));
      }, error: (_error) => {

      }, complete:() =>{

      }});
    }
  }


  public getUniversitiesByCareers(_dato: CareersResponse[]):CareersModel[]{
    console.log('CARRERAS: ' + JSON.stringify(_dato));
    let _carreras:String[] = [];
    _dato.forEach(elemnet => {
      let _verifycation = this._carrersModel.filter(x => x.CAREERS.CAREERS === elemnet.CAREERS);
      console.log(_verifycation.length + ' - ' + elemnet.CAREERS + ' - ' + JSON.stringify(_carreras));
      if(_verifycation.length === 0 ){
        this._careersAdd.CAREERS = elemnet;
        this._careersVerifyAdd = _dato.filter( x => x.CAREERS === elemnet.CAREERS); 
        this._carrersModel.push(this._careersAdd);
      }

    });

    this._carrersModel.forEach( element => {
      this._careersVerifyAdd = _dato.filter( x => x.CAREERS === element.CAREERS.CAREERS);
      this._careersVerifyAdd.forEach(item => {
        this._serviceConnection.getUniversitiesById(item.ID_UNIVERSITIES).subscribe({ next: (_response) => {
          element.UNIVERSITIES.push(_response);
          console.log('UNIVERSIDAD RESPONSE: ' + JSON.stringify(element.UNIVERSITIES));
        }, error: (_error) => {
  
        }, complete:() =>{
  
        }});
      });
    });
    return this._carrersModel;
  }

  public getUniversitiesById(_idUniversity: number): UniversitiesResponse{
    let _responseUniversities: UniversitiesResponse = new UniversitiesResponse;
    this._serviceConnection.getUniversitiesById(_idUniversity).subscribe({ next: (_response) => {
      _responseUniversities = _response;
    }, error: (_error) => {

    }, complete:() =>{

    }});
    return _responseUniversities;
  }
}
