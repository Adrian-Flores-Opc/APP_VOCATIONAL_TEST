import { SectionsResponse } from './../../../model/sections/sections.model';
import { Component, OnInit } from '@angular/core';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { QuestionsResponse, QuestionsResult } from 'src/app/model/questions/questions.model';
import { AnswersResponse } from 'src/app/model/answers/answers.model';
import { StorageService } from 'src/app/core/session/storage.service';
import { Session } from 'src/app/model/session/session.model';
import { ResultRequest, ResultResponse } from 'src/app/model/result/result.model';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  public _questionsResponse!: QuestionsResponse[];
  public _sectionsResponse!: SectionsResponse[];
  public _answersResponse!: AnswersResponse[];
  public _sessionResponse !: Session;

  public _questionsSectionATypeA !: QuestionsResponse[];
  public _questionsSectionBTypeA !: QuestionsResponse[];
  public _questionsSectionCTypeA !: QuestionsResponse[];
  public _questionsSectionDTypeA !: QuestionsResponse[];
  public _questionsSectionETypeA !: QuestionsResponse[];
  public _questionsSectionFTypeA !: QuestionsResponse[];
  public _questionsSectionGTypeA !: QuestionsResponse[];
  public _questionsSectionHTypeA !: QuestionsResponse[];

  public _answersSectionATypeA !: AnswersResponse[];
  public _answersSectionBTypeA !: AnswersResponse[];
  public _answersSectionCTypeA !: AnswersResponse[];
  public _answersSectionDTypeA !: AnswersResponse[];
  public _answersSectionETypeA !: AnswersResponse[];
  public _answersSectionFTypeA !: AnswersResponse[];
  public _answersSectionGTypeA !: AnswersResponse[];
  public _answersSectionHTypeA !: AnswersResponse[];


  public _questionsResult !: QuestionsResult[];


  public _resultQuestionsRequest !: ResultRequest;
  public _resultQuestionsResponse !: ResultResponse;

  constructor(private _connectionService: ConeectionApiService, private _storage: StorageService) { }

  ngOnInit(): void {
    // this._questionsResponse = new QuestionsResponse;
    this._resultQuestionsRequest = new ResultRequest();
    this._resultQuestionsResponse = new ResultResponse();
    
    this._sessionResponse = this._storage.getCurrentSession();
    console.log('SESSION DENTRO DEL DASHBOARD TAKE TEST: ' + JSON.stringify(this._sessionResponse));
    this.getQuestions();
    this.getAnswers();
    this.getSections();
  }
  public getQuestions():void{
    this._connectionService.getQuestions().subscribe({ next: (_response) => {
      this._questionsResponse = _response;

      this._questionsSectionATypeA = this._questionsResponse.filter(x => x.ID_SECTION == 1);
      this._questionsSectionBTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 2);
      this._questionsSectionCTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 3);
      this._questionsSectionDTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 4);
      this._questionsSectionETypeA = this._questionsResponse.filter(x => x.ID_SECTION == 5);
      this._questionsSectionFTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 6);
      this._questionsSectionGTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 7);
      this._questionsSectionHTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 8);
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
      console.log('INFORMACION OBTENIDA CORRECTAMENTE');
    }});
  }

  public getAnswers():void{
    this._connectionService.getAnswers().subscribe({ next: (_response) => {
      this._answersResponse = _response;
      this._answersSectionATypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionBTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionCTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionDTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionETypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionFTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionGTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
      this._answersSectionHTypeA = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
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

  public checkAnswersVerify(_data: AnswersResponse, typeSection: String, section: String, event:boolean, _dataQuestions: QuestionsResponse):void{
    console.log('ANSWERS CHECK: ' + JSON.stringify(_data));
    console.log('ANSWERS CHECK: ' + JSON.stringify(_dataQuestions));
    console.log('ANSWERS CHECK: ' + typeSection);
    console.log('ANSWERS CHECK: ' + section);
    console.log('ANSWERS CHECK: ' + event);
    this.saveResultAnswers(_data.ID_ANSWERS, _dataQuestions.ID_QUESTIONS);
    this._answersSectionATypeA.forEach(element => {
      if(element.ID_ANSWERS != _data.ID_ANSWERS){
        element.CHECK = false;
      }
    });
  }

  public saveResultAnswers(idAnswers: number, idQuestions: number):void{
    this._resultQuestionsRequest.ID_ANSWERS = idAnswers;
    this._resultQuestionsRequest.ID_QUESTIONS = idQuestions;
    this._resultQuestionsRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
    this._connectionService.saveResult(this._resultQuestionsRequest).subscribe({ next: (_response) => {
      console.log('RESPUESTA ENVIADA: ' + JSON.stringify(_response));
    }, error: (_error) => {

    }, complete: () => {

    }});
  }
}
