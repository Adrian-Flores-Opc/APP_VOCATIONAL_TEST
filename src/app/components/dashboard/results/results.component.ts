import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/session/storage.service';
import { Session } from 'src/app/model/session/session.model';

export interface datosResultados {
  capacidades: string,
  descripcion: string
}
const ELEMENT_DATA: datosResultados[] = [
  { capacidades: 'Habilidades', descripcion: 'Identificar modelos, calcular, formular y verificar hipotesis, utilizar el metodo cientifico y los razonamientos inductivos y deductivo.'},
  { capacidades: 'Ejemplos de Profesiones', descripcion: 'Ingenieros, cientificos, economistas, matematicos.'},
];
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  displayedColumns: string[] = ['capacidades','descripcion'];
  dataSource = ELEMENT_DATA;

  public _sessionResponse !: Session;

  constructor(private _storage: StorageService) { }

  ngOnInit(): void {
    this._sessionResponse = this._storage.getCurrentSession();
  }

}
