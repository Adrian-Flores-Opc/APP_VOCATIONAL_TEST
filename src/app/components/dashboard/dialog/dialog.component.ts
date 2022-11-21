import { UniversitiesResponse } from './../../../model/universities/universities.model';
import { CareersResponse } from 'src/app/model/careers/careers.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public _carrera !: String;
  public _universitiesResponse : UniversitiesResponse[] = [];
  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _serviceConnection: ConeectionApiService ) { }

  ngOnInit(): void {
    this.getUniversitiesByCarrera();
  }

  public getUniversitiesByCarrera():void{
    this._serviceConnection.getCareers().subscribe({ next: (_response) => {
      let _carrerasSearch : CareersResponse[] = [];
      console.log('CARRERA A FILTRAR: ' + this.data.carrera);
      _carrerasSearch = _response.filter(x => x.CAREERS === this.data.carrera);
      _carrerasSearch.forEach( element => {
        this._serviceConnection.getUniversitiesById(element.ID_UNIVERSITIES).subscribe({ next: (_response) => {
          this._universitiesResponse.push(_response);
        }, error: (_error) => {

        }, complete:() => {

        }});
      });
      console.log('LISTADO DE UNIVERSIDADES POR CARRERA:' + JSON.stringify(this._universitiesResponse));
    }, error: (_error) => {

    }, complete:() => {

    }});
  }
}
