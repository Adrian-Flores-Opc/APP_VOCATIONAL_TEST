import { SectionsResponse } from './../../../model/sections/sections.model';
import { Component, OnInit } from '@angular/core';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { QuestionsResponse } from 'src/app/model/questions/questions.model';
import { AnswersResponse } from 'src/app/model/answers/answers.model';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  public _questionsResponse!: QuestionsResponse[];
  public _sectionsResponse!: SectionsResponse[];
  public _answersResponse!: AnswersResponse[];
  constructor(private _connectionService: ConeectionApiService) { }

  ngOnInit(): void {
    // this._questionsResponse = new QuestionsResponse;
    this.getQuestions();
    this.getAnswers();
    this.getSections();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public getQuestions():void{
    this._connectionService.getQuestions().subscribe({ next: (_response) => {
      this._questionsResponse = _response;
      console.log(JSON.stringify(this._questionsResponse));
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
      console.log('INFORMACION OBTENIDA CORRECTAMENTE');
    }});
  }

  public getAnswers():void{
    this._connectionService.getAnswers().subscribe({ next: (_response) => {
      this._answersResponse = _response;
      console.log(JSON.stringify(this._answersResponse));
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
      console.log('INFORMACION OBTENIDA CORRECTAMENTE');
    }});
  }

  public getSections():void{
    this._connectionService.getSections().subscribe({ next: (_response) => {
      this._sectionsResponse = _response;
      console.log(JSON.stringify(this._sectionsResponse));
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
      console.log('INFORMACION OBTENIDA CORRECTAMENTE');
    }});
  }
}
