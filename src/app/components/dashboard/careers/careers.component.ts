import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/session/storage.service';
import { Session } from 'src/app/model/session/session.model';
import { CareersModel, CareersResponse } from 'src/app/model/careers/careers.model';
import { UniversitiesResponse } from 'src/app/model/universities/universities.model';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IntelligenceResponse } from 'src/app/model/intelligence/intelligence.model';

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
  public _modelToDrawRaces:CareersModel[] = [];
  public _agregarUniversidadesXCarrera : UniversitiesResponse[] = [];


  public _responseIntelligense !: IntelligenceResponse;
  constructor(private _storage: StorageService, private _serviceConnection: ConeectionApiService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this._universitiesResponse = new UniversitiesResponse();
    this._careersAdd = new CareersModel();
    this._universitiesAdd = new UniversitiesResponse();
    this._sessionResponse = this._storage.getCurrentSession();
    this._responseIntelligense = new IntelligenceResponse();
    if(this._sessionResponse.stateTestingIdentity === 'P'){
      this.getintelligenseById();
      this.getCarrerasIterar();
    }
  }

  openDialog(_nameCarrera: String){
    this._dialog.open(DialogComponent, {data:{ carrera: _nameCarrera}, width:'500px', height: '350px' });
  }

  public getCarrerasIterar():void{
    this._serviceConnection.getCareers().subscribe({ next: (_response) =>{
      let _verificarCarreraIterar = _response.filter(x => x.ID_INTELLIGENSE === this._sessionResponse.idInteligence);
      this.armadoModeloCarrera(_verificarCarreraIterar);
    }, error: (_error) =>{

    }, complete:() =>{

    }});
  }

  public armadoModeloCarrera(_dato: CareersResponse[]):void{
    _dato.forEach( elementCarrera => {
      let _verificarCarreraAgregar = this._modelToDrawRaces.filter(x => x.CAREERS.CAREERS === elementCarrera.CAREERS);
      if(_verificarCarreraAgregar.length === 0 ){
        let _agregarCarreraFiltrado: CareersModel = new CareersModel();
        _agregarCarreraFiltrado.CAREERS = elementCarrera;
        _agregarCarreraFiltrado.UNIVERSITIES = [];
        this._modelToDrawRaces.push(_agregarCarreraFiltrado);
      }
    });
    console.log('LISTA DE CARRERAS FILTRADO: ' + JSON.stringify(this._modelToDrawRaces));
  }

  public getintelligenseById():void{
    this._serviceConnection.getIntelligenceById(this._sessionResponse.idInteligence).subscribe( { next: (_response) => {
      this._responseIntelligense = _response;
    }, error: (_error) => {

    }, complete:() => {

    }});
  }
}
