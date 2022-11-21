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
        // OBJETO QUE CONTIENE TODAS LAS CARRERAS CORRESPONDIENTE AL ID INTELIENCIA
        this._carrersModelResponse = this.getUniversitiesByCareers(this._careersResponse);
        // ITERAR EL OBTEJO PARA ARMAR LAS UNIVERSIDADES POR CARRERA 
        this._carrersModelResponse.forEach( elementCarrera => {
          let _verificationCarrera = this._carrersModel.filter(x => x.CAREERS.CAREERS === elementCarrera.CAREERS.CAREERS);
          if (_verificationCarrera.length === 0){
            let _carrerasAdd: CareersModel = new CareersModel();
            _carrerasAdd.CAREERS = elementCarrera.CAREERS;
            this._careersResponse.forEach( elementUniversidades => {
              if(elementUniversidades.CAREERS === _carrerasAdd.CAREERS.CAREERS){
                this._serviceConnection.getUniversitiesById(elementUniversidades.ID_UNIVERSITIES).subscribe({ next: (_response) => {
                  // let _universidadesAdd: UniversitiesResponse = new UniversitiesResponse();
                  // _universidadesAdd = _response;
                  // _carrerasAdd.UNIVERSITIES.push(_universidadesAdd);
                  _carrerasAdd.UNIVERSITIES.push(_response);
                }, error: (_error) => {
            
                }, complete:() =>{
            
                }});
              }
            });
            this._carrersModel.push(_carrerasAdd);
          }
        });
      }, error: (_error) => {

      }, complete:() =>{

      }});
      console.log('LISTA DE CARRERAS POR UNIVERSIDADES: ' + JSON.stringify(this._carrersModel));
    }
  }


  public getUniversitiesByCareers(_dato: CareersResponse[]):CareersModel[]{
    _dato.forEach(elemnet => {
      let _verifycation = this._carrersModel.filter(x => x.CAREERS.CAREERS === elemnet.CAREERS);
      if(_verifycation.length === 0 ){
        this._careersAdd.CAREERS = elemnet;
        this._carrersModel.push(this._careersAdd);
      }
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
