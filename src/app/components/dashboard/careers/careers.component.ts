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


  public _modelToDrawRaces:CareersModel[] = [];

  public _agregarUniversidadesXCarrera : UniversitiesResponse[] = [];

  constructor(private _storage: StorageService, private _serviceConnection: ConeectionApiService) {
   }

  
  ngOnInit(): void {

    this._universitiesResponse = new UniversitiesResponse();
    this._careersAdd = new CareersModel();
    this._universitiesAdd = new UniversitiesResponse();
    this._sessionResponse = this._storage.getCurrentSession();
    if(this._sessionResponse.stateTestingIdentity === 'P'){
      this.getCarrerasIterar();
    }
  }


  public getCarrerasIterar():void{
    this._serviceConnection.getCareers().subscribe({ next: (_response) =>{
      let _verificarCarreraIterar = _response.filter(x => x.ID_INTELLIGENSE === this._sessionResponse.idInteligence);
      this.armadoModeloCarrera(_verificarCarreraIterar);
      this.armadoModeloUniversidaXCarrera(_verificarCarreraIterar);
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

  public armadoUniversidadesXCarreraServicio(_datoCarreras: CareersResponse[], _carrera: String):UniversitiesResponse[]{
    const _armadoUniversities : UniversitiesResponse[] = [];
    let _universidadesXCarrera = _datoCarreras.filter(x => x.CAREERS === _carrera);
    
    for(let i = 0; i < _universidadesXCarrera.length; i++){
      this._serviceConnection.getUniversitiesById(_universidadesXCarrera[i].ID_UNIVERSITIES).subscribe({ next: (_response) => {

        // console.log('UNIVERSIDAD AGREGADO PRINCIPAL: ' + JSON.stringify(_response));
        // this._agregarUniversidadesXCarrera.push(_response);
        console.log('RESPUESTAS GENERACION ARRAY UNI: ' + JSON.stringify(_response));
        _armadoUniversities.push(_response);

      }, error: (_error) => {
  
      }, complete:() =>{
  
      }});

    };      
    console.log('UNIVERSIDAD AGREGADO PRINCIPAL: ' + JSON.stringify(_armadoUniversities)); 
    return _armadoUniversities;
  }
  public armadoModeloUniversidaXCarrera(_datoCarreras: CareersResponse[]):void{
    this._modelToDrawRaces.forEach( elementoCarrera => {
      let _universidadesXCarrera = _datoCarreras.filter(x => x.CAREERS === elementoCarrera.CAREERS.CAREERS);
      console.log('UNIVERSIDADES A AGREGAR INICIAL: '+ JSON.stringify(_universidadesXCarrera));
      // this.armadoUniversidadesXCarreraServicio(_universidadesXCarrera, elementoCarrera.CAREERS.CAREERS);

      // _universidadesXCarrera.forEach( elementoUniversidad => {
      //   this._serviceConnection.getUniversitiesById(elementoUniversidad.ID_UNIVERSITIES).subscribe({ next: (_response) => {

      //     // console.log('UNIVERSIDAD AGREGADO PRINCIPAL: ' + JSON.stringify(_response));
      //     this._agregarUniversidadesXCarrera.push(_response);
      //     console.log('UNIVERSIDAD AGREGADO PRINCIPAL: ' + JSON.stringify(this._agregarUniversidadesXCarrera));

      //   }, error: (_error) => {
    
      //   }, complete:() =>{
    
      //   }});
      // });

      
      elementoCarrera.UNIVERSITIES = this.armadoUniversidadesXCarreraServicio(_universidadesXCarrera, elementoCarrera.CAREERS.CAREERS);
      // console.log('ELEMENTO UNIVERSIDAD AGREGADO: ' + JSON.stringify(elementoCarrera.UNIVERSITIES));
      console.log('ELEMENTO AGREGADO: ' + JSON.stringify(elementoCarrera));
    });
    console.log('LISTA DE UNIVERSIDADES COMPLETO ' + JSON.stringify(this._modelToDrawRaces));
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
