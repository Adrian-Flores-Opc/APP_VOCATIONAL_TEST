import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
