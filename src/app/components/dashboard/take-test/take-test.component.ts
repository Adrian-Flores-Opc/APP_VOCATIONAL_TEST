import { AnswersModelVerification, QuestionsModelVerification } from './../../../model/questions/questions.model';
import Swal from 'sweetalert2';
import { SectionsResponse } from './../../../model/sections/sections.model';
import { Component, OnInit } from '@angular/core';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { QuestionsModelResul, QuestionsResponse, QuestionsResult } from 'src/app/model/questions/questions.model';
import { AnswersResponse } from 'src/app/model/answers/answers.model';
import { StorageService } from 'src/app/core/session/storage.service';
import { dataPuntuaction, Session } from 'src/app/model/session/session.model';
import { ResultRequest, ResultResponse } from 'src/app/model/result/result.model';
import { ServiceNotificationsService } from 'src/app/core/service-notifications/service-notifications.service';
import { TestingResponse } from 'src/app/model/testing/testing.model';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css']
})
export class TakeTestComponent implements OnInit {

  //#region  VARIABLES QUESTIONS AND ANSWERS
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

  public _resultCalculation !: ResultResponse[];

  public _questionsResult !: QuestionsResult[];


  public _resultQuestionsRequest !: ResultRequest;
  public _resultQuestionsResponse !: ResultResponse;


  public _modelQuestionsResult !: QuestionsModelResul;


  public _answersResponseCalculation !: AnswersResponse;
  public _questionResponseCalculation !:QuestionsResponse;

  public _puntuactionBloqueA!:number;

  public _puntuactionBloqueASectionA!:number;
  public _puntuactionBloqueASectionB!:number;
  public _puntuactionBloqueASectionC!:number;
  public _puntuactionBloqueASectionD!:number;
  public _puntuactionBloqueASectionE!:number;
  public _puntuactionBloqueASectionF!:number;
  public _puntuactionBloqueASectionG!:number;
  public _puntuactionBloqueASectionH!:number;

  public _puntuactionBloqueB!:number;

  public _puntuactionBloqueBSectionA!:number;
  public _puntuactionBloqueBSectionB!:number;
  public _puntuactionBloqueBSectionC!:number;
  public _puntuactionBloqueBSectionD!:number;
  public _puntuactionBloqueBSectionE!:number;
  public _puntuactionBloqueBSectionF!:number;
  public _puntuactionBloqueBSectionG!:number;
  public _puntuactionBloqueBSectionH!:number;

//#endregion

  public _verificationModelQuestions !: QuestionsModelVerification;
  public _saveResult !: ResultResponse;



  constructor(private _connectionService: ConeectionApiService, private _storage: StorageService, private _serviceNotification: ServiceNotificationsService) { }

  ngOnInit(): void {
    // this._questionsResponse = new QuestionsResponse;
    this._sessionResponse = this._storage.getCurrentSession();
    this._verificationModelQuestions = new QuestionsModelVerification();
    this._saveResult = new ResultResponse();
    this._puntuactionBloqueA = 0;
    this._puntuactionBloqueB = 0;
    this._resultQuestionsRequest = new ResultRequest();
    this._resultQuestionsResponse = new ResultResponse();
    this._modelQuestionsResult = new QuestionsModelResul();
    this._sessionResponse.puntuactionBloqueA = 0;
    this._sessionResponse.puntuactionBloqueB = 0;
    this._sessionResponse.idInteligenceSiete = 0;
    this._sessionResponse.idRecomendacion = 0;
    // console.log('DASHBOARD MODULE ACTIVATE: ' + JSON.stringify(this._sessionResponse));
    this._sessionResponse.puntuactionBloqueASectionA = this._puntuactionBloqueASectionA = 0;
    this._sessionResponse.puntuactionBloqueBSectionA = this._puntuactionBloqueASectionB = 0;
    this._sessionResponse.puntuactionBloqueCSectionA = this._puntuactionBloqueASectionC = 0;
    this._sessionResponse.puntuactionBloqueDSectionA = this._puntuactionBloqueASectionD = 0;
    this._sessionResponse.puntuactionBloqueESectionA = this._puntuactionBloqueASectionE = 0;
    this._sessionResponse.puntuactionBloqueFSectionA = this._puntuactionBloqueASectionF = 0;
    this._sessionResponse.puntuactionBloqueGSectionA = this._puntuactionBloqueASectionG = 0;
    this._sessionResponse.puntuactionBloqueHSectionA = this._puntuactionBloqueASectionH = 0;

    this._sessionResponse.puntuactionBloqueASectionB = this._puntuactionBloqueBSectionA = 0;
    this._sessionResponse.puntuactionBloqueBSectionB = this._puntuactionBloqueBSectionB = 0;
    this._sessionResponse.puntuactionBloqueCSectionB = this._puntuactionBloqueBSectionC = 0;
    this._sessionResponse.puntuactionBloqueDSectionB = this._puntuactionBloqueBSectionD = 0;
    this._sessionResponse.puntuactionBloqueESectionB = this._puntuactionBloqueBSectionE = 0;
    this._sessionResponse.puntuactionBloqueFSectionB = this._puntuactionBloqueBSectionF = 0;
    this._sessionResponse.puntuactionBloqueGSectionB = this._puntuactionBloqueBSectionG = 0;
    this._sessionResponse.puntuactionBloqueHSectionB = this._puntuactionBloqueBSectionH = 0;
    // console.log('INVOCACION NGONIT TAKE TEST');
    this._sessionResponse.puntuactionSectionA = [];
    this._sessionResponse.puntuactionSectionB = [];
    this._storage.setCurrentSession(this._sessionResponse);
    this._sessionResponse = this._storage.getCurrentSession();

    this.getQuestions();
    this.getSections();
    // this.generateModelResult();
  }
  public generateModelResult():void{
    this._modelQuestionsResult.sectionATypeA = this._questionsResponse.filter(x => x.ID_SECTION == 1);
    this._modelQuestionsResult.sectionATypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionBTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 2);
    this._modelQuestionsResult.sectionBTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionCTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 3);
    this._modelQuestionsResult.sectionCTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionDTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 4);
    this._modelQuestionsResult.sectionDTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionETypeA = this._questionsResponse.filter(x => x.ID_SECTION == 5);
    this._modelQuestionsResult.sectionETypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionFTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 6);
    this._modelQuestionsResult.sectionFTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionGTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 7);
    this._modelQuestionsResult.sectionGTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });

    this._modelQuestionsResult.sectionHTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 8);
    this._modelQuestionsResult.sectionHTypeA.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
    });


    this._modelQuestionsResult.sectionATypeB = this._questionsResponse.filter(x => x.ID_SECTION == 9);
    this._modelQuestionsResult.sectionATypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionBTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 10);
    this._modelQuestionsResult.sectionBTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionCTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 11);
    this._modelQuestionsResult.sectionCTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionDTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 12);
    this._modelQuestionsResult.sectionDTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionETypeB = this._questionsResponse.filter(x => x.ID_SECTION == 13);
    this._modelQuestionsResult.sectionETypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionFTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 14);
    this._modelQuestionsResult.sectionFTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionGTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 15);
    this._modelQuestionsResult.sectionGTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });

    this._modelQuestionsResult.sectionHTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 16);
    this._modelQuestionsResult.sectionHTypeB.forEach( element => {
      element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
    });
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

      this._modelQuestionsResult.sectionATypeA = this._questionsResponse.filter(x => x.ID_SECTION == 1);
      this._modelQuestionsResult.sectionBTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 2);
      this._modelQuestionsResult.sectionCTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 3);
      this._modelQuestionsResult.sectionDTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 4);
      this._modelQuestionsResult.sectionETypeA = this._questionsResponse.filter(x => x.ID_SECTION == 5);
      this._modelQuestionsResult.sectionFTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 6);
      this._modelQuestionsResult.sectionGTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 7);
      this._modelQuestionsResult.sectionHTypeA = this._questionsResponse.filter(x => x.ID_SECTION == 8);
      this._modelQuestionsResult.sectionATypeB = this._questionsResponse.filter(x => x.ID_SECTION == 9);
      this._modelQuestionsResult.sectionBTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 10);
      this._modelQuestionsResult.sectionCTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 11);
      this._modelQuestionsResult.sectionDTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 12);
      this._modelQuestionsResult.sectionETypeB = this._questionsResponse.filter(x => x.ID_SECTION == 13);
      this._modelQuestionsResult.sectionFTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 14);
      this._modelQuestionsResult.sectionGTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 15);
      this._modelQuestionsResult.sectionHTypeB = this._questionsResponse.filter(x => x.ID_SECTION == 16);
      this.getAnswers();
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
    }});
  }

  public getAnswers():void{
    this._connectionService.getAnswers().subscribe({ next: (_response) => {
      this._answersResponse = _response;


      this._modelQuestionsResult.sectionATypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionBTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionCTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionDTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionETypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionFTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionGTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionHTypeA.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'A');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });


      this._modelQuestionsResult.sectionATypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionBTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionCTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionDTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionETypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionFTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionGTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });
      this._modelQuestionsResult.sectionHTypeB.forEach( element => {
        element.ANSWERS = this._answersResponse.filter(x => x.TYPE_ANSWERS == 'B');
        element.ANSWERS.forEach( elementAnswers => {
          elementAnswers.CHECK = false;
        });
      });





    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {
    }});
  }

  public getSections():void{
    this._connectionService.getSections().subscribe({ next: (_response) => {
      this._sectionsResponse = _response;
    }, error: (_error) => {
      console.log('ERROR: ' + _error);
    }, complete:() => {

    }});
  }



  public getResultTesting():void{
    this._connectionService.getResul().subscribe({ next: (_response) => {

      //ID TESTING PARA OBTENER LA RESPUESTAS
      this._resultCalculation = _response.filter(x => x.ID_TESTING === this._sessionResponse.idTestingIdentity);
      //DATO QUEMADO
      // this._resultCalculation = _response.filter(x => x.ID_TESTING === 19);
      this.obtTotalTipoSeccion(this._resultCalculation);
    }, error: (_error) => {

    }, complete: () => {

    }});
  }

  public getResultById(_data:any):AnswersResponse{
    this._connectionService.getAnswersById(_data.ID_ANSWERS).subscribe({ next: (_response) => {
      this._answersResponseCalculation = _response;
    }, error: (_error) => {

    }, complete: () => {

    }});
    return this._answersResponseCalculation;
  }


  public getQuestionsById(_data:any):QuestionsResponse{
    this._connectionService.getQuestionsById(_data).subscribe({ next: (_response) => {
      this._questionResponseCalculation = _response;
    }, error: (_error) => {

    }, complete: () => {

    }});
    return this._questionResponseCalculation;
  }

  public obtTotalTipoSeccion(_datos: ResultResponse[]):void{
    _datos.forEach(element => {
      this._connectionService.getQuestionsById(element.ID_QUESTIONS).subscribe({ next: (_response) => {
        this._questionResponseCalculation = _response;
        if(_response.ID_SECTION === 1 || _response.ID_SECTION === 2 || _response.ID_SECTION === 3|| _response.ID_SECTION === 4|| _response.ID_SECTION === 5|| _response.ID_SECTION === 6|| _response.ID_SECTION === 7|| _response.ID_SECTION === 8){
          this._connectionService.getAnswersById(element.ID_ANSWERS).subscribe({ next: (_responsePunt) => {
            let _comparationBloques: dataPuntuaction[] = [
              { bloque:'A',puntuaction: this._sessionResponse.puntuactionBloqueASectionA },
              { bloque:'B',puntuaction: this._sessionResponse.puntuactionBloqueBSectionA },
              { bloque:'C',puntuaction: this._sessionResponse.puntuactionBloqueCSectionA },
              { bloque:'D',puntuaction: this._sessionResponse.puntuactionBloqueDSectionA },
              { bloque:'E',puntuaction: this._sessionResponse.puntuactionBloqueESectionA },
              { bloque:'F',puntuaction: this._sessionResponse.puntuactionBloqueFSectionA },
              { bloque:'G',puntuaction: this._sessionResponse.puntuactionBloqueGSectionA },
              { bloque:'H',puntuaction: this._sessionResponse.puntuactionBloqueHSectionA }
            ];
            switch(_response.ID_SECTION){
              case 1:
                this._puntuactionBloqueASectionA = this._puntuactionBloqueASectionA + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueASectionA = this._puntuactionBloqueASectionA;
                _comparationBloques[0].puntuaction = this._sessionResponse.puntuactionBloqueASectionA;
              break;
              case 2:
                this._puntuactionBloqueASectionB = this._puntuactionBloqueASectionB + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueBSectionA = this._puntuactionBloqueASectionB;
                _comparationBloques[1].puntuaction = this._sessionResponse.puntuactionBloqueBSectionA;
              break;
              case 3:
                this._puntuactionBloqueASectionC = this._puntuactionBloqueASectionC + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueCSectionA = this._puntuactionBloqueASectionC;
                _comparationBloques[2].puntuaction = this._sessionResponse.puntuactionBloqueCSectionA;
              break;
              case 4:
                this._puntuactionBloqueASectionD = this._puntuactionBloqueASectionD + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueDSectionA = this._puntuactionBloqueASectionD;
                _comparationBloques[3].puntuaction = this._sessionResponse.puntuactionBloqueDSectionA;
              break;
              case 5:
                this._puntuactionBloqueASectionE = this._puntuactionBloqueASectionE + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueESectionA = this._puntuactionBloqueASectionE;
                _comparationBloques[4].puntuaction = this._sessionResponse.puntuactionBloqueESectionA;
              break;
              case 6:
                this._puntuactionBloqueASectionF = this._puntuactionBloqueASectionF + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueFSectionA = this._puntuactionBloqueASectionF;
                _comparationBloques[5].puntuaction = this._sessionResponse.puntuactionBloqueFSectionA;
              break;
              case 7:
                this._puntuactionBloqueASectionG = this._puntuactionBloqueASectionG + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueGSectionA = this._puntuactionBloqueASectionG;
                _comparationBloques[6].puntuaction = this._sessionResponse.puntuactionBloqueGSectionA;
              break;
              case 8:
                this._puntuactionBloqueASectionH = this._puntuactionBloqueASectionH + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueHSectionA = this._puntuactionBloqueASectionH;
                _comparationBloques[7].puntuaction = this._sessionResponse.puntuactionBloqueHSectionA;
              break;
            }

            this._puntuactionBloqueA = this._puntuactionBloqueA +_responsePunt.PUNCTUATION;
            this._puntuactionBloqueA = Math.max(
              this._sessionResponse.puntuactionBloqueASectionA,
              this._sessionResponse.puntuactionBloqueBSectionA,
              this._sessionResponse.puntuactionBloqueCSectionA,
              this._sessionResponse.puntuactionBloqueDSectionA,
              this._sessionResponse.puntuactionBloqueESectionA,
              this._sessionResponse.puntuactionBloqueFSectionA,
              this._sessionResponse.puntuactionBloqueGSectionA,
              this._sessionResponse.puntuactionBloqueHSectionA);

            this._sessionResponse.puntuactionSectionA = _comparationBloques;
            this._sessionResponse.puntuactionBloqueA = this._puntuactionBloqueA;
            this._storage.setCurrentSession(this._sessionResponse);
            this._sessionResponse = this._storage.getCurrentSession();
            this.getIntelligense(this._sessionResponse.puntuactionBloqueA, this._sessionResponse.puntuactionBloqueB, this._sessionResponse.puntuactionSectionA , this._sessionResponse.puntuactionSectionB);
          }, error: (_error) => {

          }, complete: () => {

          }});

        }
        if(_response.ID_SECTION === 9 || _response.ID_SECTION === 10 || _response.ID_SECTION === 11 || _response.ID_SECTION === 12|| _response.ID_SECTION === 13|| _response.ID_SECTION === 14|| _response.ID_SECTION === 15|| _response.ID_SECTION === 16){
          this._connectionService.getAnswersById(element.ID_ANSWERS).subscribe({ next: (_responsePunt) => {
            let _comparationBloques: dataPuntuaction[] = [
              { bloque:'A',puntuaction: this._sessionResponse.puntuactionBloqueASectionB },
              { bloque:'B',puntuaction: this._sessionResponse.puntuactionBloqueBSectionB },
              { bloque:'C',puntuaction: this._sessionResponse.puntuactionBloqueCSectionB },
              { bloque:'D',puntuaction: this._sessionResponse.puntuactionBloqueDSectionB },
              { bloque:'E',puntuaction: this._sessionResponse.puntuactionBloqueESectionB },
              { bloque:'F',puntuaction: this._sessionResponse.puntuactionBloqueFSectionB },
              { bloque:'G',puntuaction: this._sessionResponse.puntuactionBloqueGSectionB },
              { bloque:'H',puntuaction: this._sessionResponse.puntuactionBloqueHSectionB }
            ];
            switch(_response.ID_SECTION){
              case 9:
                this._puntuactionBloqueBSectionA = this._puntuactionBloqueBSectionA + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueASectionB = this._puntuactionBloqueBSectionA;
                _comparationBloques[0].puntuaction = this._sessionResponse.puntuactionBloqueASectionB;
              break;
              case 10:
                this._puntuactionBloqueBSectionB = this._puntuactionBloqueBSectionB + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueBSectionB = this._puntuactionBloqueBSectionB;
                _comparationBloques[1].puntuaction = this._sessionResponse.puntuactionBloqueBSectionB;
              break;
              case 11:
                this._puntuactionBloqueBSectionC = this._puntuactionBloqueBSectionC + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueCSectionB = this._puntuactionBloqueBSectionC;
                _comparationBloques[2].puntuaction = this._sessionResponse.puntuactionBloqueCSectionB;
              break;
              case 12:
                this._puntuactionBloqueBSectionD = this._puntuactionBloqueBSectionD + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueDSectionB = this._puntuactionBloqueBSectionD;
                _comparationBloques[3].puntuaction = this._sessionResponse.puntuactionBloqueDSectionB;
              break;
              case 13:
                this._puntuactionBloqueBSectionE = this._puntuactionBloqueBSectionE + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueESectionB = this._puntuactionBloqueBSectionE;
                _comparationBloques[4].puntuaction = this._sessionResponse.puntuactionBloqueESectionB;
              break;
              case 14:
                this._puntuactionBloqueBSectionF = this._puntuactionBloqueBSectionF + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueFSectionB = this._puntuactionBloqueBSectionF;
                _comparationBloques[5].puntuaction = this._sessionResponse.puntuactionBloqueFSectionB;
              break;
              case 15:
                this._puntuactionBloqueBSectionG = this._puntuactionBloqueBSectionG + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueGSectionB = this._puntuactionBloqueBSectionG;
                _comparationBloques[6].puntuaction = this._sessionResponse.puntuactionBloqueGSectionB;
              break;
              case 16:
                this._puntuactionBloqueBSectionH = this._puntuactionBloqueBSectionH + _responsePunt.PUNCTUATION;
                this._sessionResponse.puntuactionBloqueHSectionB = this._puntuactionBloqueBSectionH;
                _comparationBloques[7].puntuaction = this._sessionResponse.puntuactionBloqueHSectionB;
              break;
            }

            this._puntuactionBloqueB = this._puntuactionBloqueB +_responsePunt.PUNCTUATION;
            this._puntuactionBloqueB = Math.max(
              this._sessionResponse.puntuactionBloqueASectionB,
              this._sessionResponse.puntuactionBloqueBSectionB,
              this._sessionResponse.puntuactionBloqueCSectionB,
              this._sessionResponse.puntuactionBloqueDSectionB,
              this._sessionResponse.puntuactionBloqueESectionB,
              this._sessionResponse.puntuactionBloqueFSectionB,
              this._sessionResponse.puntuactionBloqueGSectionB,
              this._sessionResponse.puntuactionBloqueHSectionB);

            this._sessionResponse.puntuactionSectionB = _comparationBloques;
            this._sessionResponse.puntuactionBloqueB = this._puntuactionBloqueB;
            this._storage.setCurrentSession(this._sessionResponse);
            this._sessionResponse = this._storage.getCurrentSession();

            this.getIntelligense(this._sessionResponse.puntuactionBloqueA, this._sessionResponse.puntuactionBloqueB, this._sessionResponse.puntuactionSectionA , this._sessionResponse.puntuactionSectionB);
          }, error: (_error) => {

          }, complete: () => {

          }});
        }

      }, error: (_error) => {

      }, complete: () => {

      }});
    });
    // this._sessionResponse = this._storage.getCurrentSession();
    // this.getIntelligense(this._sessionResponse.puntuactionBloqueA, this._sessionResponse.puntuactionBloqueB, this._sessionResponse.puntuactionSectionA , this._sessionResponse.puntuactionSectionB);
  }

  public getIntelligense(_habilidadMayor:number,  _interesMayor: number, bloqueHabilidad: dataPuntuaction[],  _bloqueInteres:dataPuntuaction[]):void{
    if(_habilidadMayor != undefined && _interesMayor != undefined && bloqueHabilidad != undefined && _bloqueInteres != undefined){
      // console.log('INVOCACION OBTENER ID INTELLIGENSE: ' + _habilidadMayor + ' - ' + _interesMayor + ' - ' + JSON.stringify(bloqueHabilidad) + ' - ' + JSON.stringify(_bloqueInteres));
    let _habilidarMayorIntSec = bloqueHabilidad.filter(x => x.puntuaction == _habilidadMayor);
    let _interesMayorIntSec = _bloqueInteres.filter(x => x.puntuaction == _interesMayor);

    let _interesAct = bloqueHabilidad.find(x => x.puntuaction === _habilidadMayor)?.bloque;
    let _bloqueSectionAnswers = _bloqueInteres.find(x => x.bloque === _interesAct)?.bloque;
    let _interesActValor = _bloqueInteres.find(x => x.bloque === _bloqueSectionAnswers)?.puntuaction;
    let _valAct : number = _interesActValor === undefined ? 0 : _interesActValor;
    // console.log('PUNTUACION ACT: ' + _interesActValor);
    //#region VALIDARDOR ID INTELIGENCIA 1
    this._sessionResponse.idInteligence = 9;
    this._sessionResponse.idRecomendacion = 1;
    this._storage.setCurrentSession(this._sessionResponse);
    this._sessionResponse = this._storage.getCurrentSession();
    // console.log('SESSION GENERADA PARA EL ID_INTELLIGENSE: ' + JSON.stringify(this._sessionResponse));

    if(_interesMayor < 15 && _habilidadMayor < 18){
      // ASIGNAR ID INTELIGENCIA 1
      this._sessionResponse.idInteligence = 9;
      this._sessionResponse.idRecomendacion = 1;
      this._sessionResponse.stateTestingIdentity = 'C';
      this._storage.setCurrentSession(this._sessionResponse);
      this._sessionResponse = this._storage.getCurrentSession();
      let _testingUpdate : TestingResponse = new TestingResponse();
      _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
      _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
      _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
      _testingUpdate.STATE = 'C';
      console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
      this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
        return;
      }, error: (_error) => {

      }, complete:() => {

      }});






      // this._sessionResponse = this._storage.getCurrentSession();
      // let _bloqueInteresMayor = _bloqueInteres.filter(x => x.puntuaction === _interesMayor);
      // let _indexInteresMayor : number = _bloqueInteres.indexOf(_bloqueInteresMayor[0]) + 1;
      // console.log('ID INTELIGENCIA OBTENIDO INTERES MAYOR INTELIGENCIA UNO: ' + _indexInteresMayor);
      // this._sessionResponse.idInteligence = _indexInteresMayor;
      // this._sessionResponse.stateTestingIdentity = 'C';
      // this._sessionResponse.idRecomendacion = 1;
      // this._storage.setCurrentSession(this._sessionResponse);

      // this._sessionResponse = this._storage.getCurrentSession();

      // let _testingUpdate : TestingResponse = new TestingResponse();
      // _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
      // _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
      // _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
      // _testingUpdate.STATE = 'C';
      // console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
      // this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
      //   return;
      // }, error: (_error) => {

      // }, complete:() => {

      // }});

      // return;
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 2
    if(_habilidadMayor < 15 && _interesMayor >= 15){
                // ASIGNAR ID INTELIGENCIA 2

                let _bloqueInteresMayor = _bloqueInteres.filter(x => x.puntuaction === _interesMayor);
                let _indexInteresMayor : number = _bloqueInteres.indexOf(_bloqueInteresMayor[0]) + 1;
                console.log('ID INTELIGENCIA OBTENIDO INTERES MAYOR INTELIGENCIA DOS: ' + _indexInteresMayor);
                this._sessionResponse.idInteligence = _indexInteresMayor;
                this._sessionResponse.stateTestingIdentity = 'C';
                this._sessionResponse.idRecomendacion = 2;
                this._storage.setCurrentSession(this._sessionResponse);
                this._sessionResponse = this._storage.getCurrentSession();
                let _testingUpdate : TestingResponse = new TestingResponse();
                _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
                _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
                _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
                _testingUpdate.STATE = 'C';
                console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
                this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
                  return;
                }, error: (_error) => {

                }, complete:() => {

                }});
                // return;
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 3
    if(_habilidadMayor >= 15 && _habilidadMayor < 18 && _interesMayor >= 15){
      if (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 3

        let _bloqueInteresMayor = _bloqueInteres.filter(x => x.puntuaction === _habilidadMayor);
        let _indexInteresMayor : number = _bloqueInteres.indexOf(_bloqueInteresMayor[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO INTERES MAYOR INTELIGENCIA TRES: ' + _indexInteresMayor);
        this._sessionResponse.idInteligence = _indexInteresMayor;
        this._sessionResponse.stateTestingIdentity = 'C';
        this._sessionResponse.idRecomendacion = 3;
        this._storage.setCurrentSession(this._sessionResponse);

        this._sessionResponse = this._storage.getCurrentSession();
        let _testingUpdate : TestingResponse = new TestingResponse();
        _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
        _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
        _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
        _testingUpdate.STATE = 'C';
        console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
        this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
          return;
        }, error: (_error) => {

        }, complete:() => {

        }});

        // return;
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 4 //
    // let _interesActValidar = this._sessionResponse.puntuactionSectionB.filter(x => x.bloque === 'BLOQUE HABILIDAD MAYOR');
    if(_habilidadMayor >= 15 && _habilidadMayor < 18 && _interesMayor >= 15){
      // ASIGNAR ID INTELIGENCIA 4
      if (_habilidarMayorIntSec[0].bloque === _interesMayorIntSec[0].bloque){
        let _bloqueHabilidadMayor = bloqueHabilidad.filter(x => x.puntuaction === _habilidadMayor);
        let _indexHabilidadMayor : number = bloqueHabilidad.indexOf(_bloqueHabilidadMayor[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO HABILIDAD MAYOR INTELIGENCIA CUATRO: ' + _indexHabilidadMayor);
        this._sessionResponse.idInteligence = _indexHabilidadMayor;
        this._sessionResponse.stateTestingIdentity = 'C';
        this._sessionResponse.idRecomendacion = 4;
        this._storage.setCurrentSession(this._sessionResponse);


        this._sessionResponse = this._storage.getCurrentSession();
        let _testingUpdate : TestingResponse = new TestingResponse();
        _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
        _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
        _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
        _testingUpdate.STATE = 'C';
        console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
        this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
          return;
        }, error: (_error) => {

        }, complete:() => {

        }});
      }
      // return;
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 5
    if(_habilidadMayor >= 18 && _interesMayor < 16){
              // ASIGNAR ID INTELIGENCIA 5

              let _bloqueHabilidadMayor = bloqueHabilidad.filter(x => x.puntuaction === _habilidadMayor);
              let _indexHabilidadMayor : number = bloqueHabilidad.indexOf(_bloqueHabilidadMayor[0]) + 1;
              console.log('ID INTELIGENCIA OBTENIDO HABILIDAD MAYOR INTELIGENCIA CINCO: ' + _indexHabilidadMayor);
              this._sessionResponse.idInteligence = _indexHabilidadMayor;
              this._sessionResponse.stateTestingIdentity = 'C';
              this._sessionResponse.idRecomendacion = 5;
              this._storage.setCurrentSession(this._sessionResponse);

              this._sessionResponse = this._storage.getCurrentSession();
              let _testingUpdate : TestingResponse = new TestingResponse();
              _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
              _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
              _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
              _testingUpdate.STATE = 'C';
              console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
              this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
                return;
              }, error: (_error) => {

              }, complete:() => {

              }});
              // return;
    }
    //#endregion

    //#region  VALIDAR ID INTELIGENCIA 6
    if(_habilidadMayor >= 18 && _interesMayor >= 16 && _interesMayor < 24){
      if (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 6

        let _bloqueHabilidadMayor = bloqueHabilidad.filter(x => x.puntuaction === _habilidadMayor);
        let _indexHabilidadMayor : number = bloqueHabilidad.indexOf(_bloqueHabilidadMayor[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO HABILIDAD MAYOR INTELIGENCIA SEIS: ' + _indexHabilidadMayor);
        this._sessionResponse.idInteligence = _indexHabilidadMayor;
        this._sessionResponse.stateTestingIdentity = 'C';
        this._sessionResponse.idRecomendacion = 6;
        this._storage.setCurrentSession(this._sessionResponse);

        this._sessionResponse = this._storage.getCurrentSession();
        let _testingUpdate : TestingResponse = new TestingResponse();
        _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
        _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
        _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
        _testingUpdate.STATE = 'C';
        console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
        this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {

          return;
        }, error: (_error) => {

        }, complete:() => {

        }});
        // return;
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 7
    if (_habilidadMayor >= 18 &&_interesMayor >= 16){
      if (_habilidarMayorIntSec[0].bloque === _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 7
        let _bloqueHabilidadMayor = bloqueHabilidad.filter(x => x.puntuaction === _habilidadMayor);
        let _indexHabilidadMayor : number = bloqueHabilidad.indexOf(_bloqueHabilidadMayor[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO HABILIDAD MAYOR INTELIGENCIA SIETE: ' + _indexHabilidadMayor);
        this._sessionResponse.idInteligence = _indexHabilidadMayor;
        this._sessionResponse.stateTestingIdentity = 'C';
        this._sessionResponse.idRecomendacion = 7;
        this._storage.setCurrentSession(this._sessionResponse);



        let _testingUpdate : TestingResponse = new TestingResponse();
        _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
        _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
        _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
        _testingUpdate.STATE = 'C';
        console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
        this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
          return;
        }, error: (_error) => {

        }, complete:() => {

        }});
        // return;
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 8
    if (_habilidadMayor >= 18 && _interesMayor > 23){
      if (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque) {
        let _bloqueHabilidadMayor = bloqueHabilidad.filter(x => x.puntuaction === _habilidadMayor);
        let _indexHabilidadMayor : number = bloqueHabilidad.indexOf(_bloqueHabilidadMayor[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO HABILIDAD MAYOR INTELIGENCIA SIETE: ' + _indexHabilidadMayor);

        let _bloqueInteresMayor1 = _bloqueInteres.filter(x => x.puntuaction === _interesMayor);
        let _indexInteresMayor1 : number = _bloqueInteres.indexOf(_bloqueInteresMayor1[0]) + 1;
        console.log('ID INTELIGENCIA OBTENIDO INTERES MAYOR INTELIGENCIA SIETE: ' + _indexInteresMayor1);
        this._sessionResponse.idInteligenceSiete = _indexInteresMayor1;
              // ASIGNAR ID INTELIGENCIA 8
        this._sessionResponse.idInteligence = _indexHabilidadMayor;
        this._sessionResponse.idRecomendacion = 8;
        this._sessionResponse.stateTestingIdentity = 'C';
        this._storage.setCurrentSession(this._sessionResponse);
        this._sessionResponse = this._storage.getCurrentSession();
        let _testingUpdate : TestingResponse = new TestingResponse();
        _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
        _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
        _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
        _testingUpdate.STATE = 'C';
        console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
        this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
          return;
        }, error: (_error) => {

        }, complete:() => {

        }});
        // return;
        }
    }
    //#endregion
    this._sessionResponse.stateTestingIdentity = 'C';
    this._storage.setCurrentSession(this._sessionResponse);
    this._sessionResponse = this._storage.getCurrentSession();
    let _testingUpdate : TestingResponse = new TestingResponse();
    _testingUpdate.ID_INTELLIGENSE = this._sessionResponse.idInteligence;
    _testingUpdate.ID_TESTING = this._sessionResponse.idTestingIdentity;
    _testingUpdate.ID_USER = this._sessionResponse.iduserIdentity;
    _testingUpdate.STATE = 'C';
    console.log('ID INTELLIGENSE PARA GUARDAR: ' + this._sessionResponse.idInteligence)
    this._connectionService.updateTesting(_testingUpdate).subscribe({ next: (_response) => {
      return;
    }, error: (_error) => {

    }, complete:() => {

    }});
  }
  }

  public confirmationSaveTestVocational():void{
    Swal.fire({
      title : '??Desea Registrar sus respuestas?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#012d74',
      denyButtonText: 'Continuar Test',
      denyButtonColor: '#A1A1A1'
    }).then((_result) => {
      if (_result.isConfirmed){

        //#region VERIFICACION DE QUE TODAS LAS RESPUESTAS ESTEN LLENADAS
        let _lentVerifiSectionAbloqueA : number = this._verificationModelQuestions._verifiSectionAbloqueA.length;
        let _lentVerifiSectionAbloqueB : number = this._verificationModelQuestions._verifiSectionAbloqueB.length;
        let _lentVerifiSectionAbloqueC : number = this._verificationModelQuestions._verifiSectionAbloqueC.length;
        let _lentVerifiSectionAbloqueD : number = this._verificationModelQuestions._verifiSectionAbloqueD.length;
        let _lentVerifiSectionAbloqueE : number = this._verificationModelQuestions._verifiSectionAbloqueE.length;
        let _lentVerifiSectionAbloqueF : number = this._verificationModelQuestions._verifiSectionAbloqueF.length;
        let _lentVerifiSectionAbloqueG : number = this._verificationModelQuestions._verifiSectionAbloqueG.length;
        let _lentVerifiSectionAbloqueH : number = this._verificationModelQuestions._verifiSectionAbloqueH.length;

        let _lentVerifiSectionBbloqueA : number = this._verificationModelQuestions._verifiSectionBbloqueA.length;
        let _lentVerifiSectionBbloqueB : number = this._verificationModelQuestions._verifiSectionBbloqueB.length;
        let _lentVerifiSectionBbloqueC : number = this._verificationModelQuestions._verifiSectionBbloqueC.length;
        let _lentVerifiSectionBbloqueD : number = this._verificationModelQuestions._verifiSectionBbloqueD.length;
        let _lentVerifiSectionBbloqueE : number = this._verificationModelQuestions._verifiSectionBbloqueE.length;
        let _lentVerifiSectionBbloqueF : number = this._verificationModelQuestions._verifiSectionBbloqueF.length;
        let _lentVerifiSectionBbloqueG : number = this._verificationModelQuestions._verifiSectionBbloqueG.length;
        let _lentVerifiSectionBbloqueH : number = this._verificationModelQuestions._verifiSectionBbloqueH.length;

        if (_lentVerifiSectionAbloqueA === 6 &&
            _lentVerifiSectionAbloqueB === 6 &&
            _lentVerifiSectionAbloqueC === 6 &&
            _lentVerifiSectionAbloqueD === 6 &&
            _lentVerifiSectionAbloqueE === 6 &&
            _lentVerifiSectionAbloqueF === 6 &&
            _lentVerifiSectionAbloqueG === 6 &&
            _lentVerifiSectionAbloqueH === 6 &&
            _lentVerifiSectionBbloqueA === 6 &&
            _lentVerifiSectionBbloqueB === 6 &&
            _lentVerifiSectionBbloqueC === 6 &&
            _lentVerifiSectionBbloqueD === 6 &&
            _lentVerifiSectionBbloqueE === 6 &&
            _lentVerifiSectionBbloqueF === 6 &&
            _lentVerifiSectionBbloqueG === 6 &&
            _lentVerifiSectionBbloqueH === 6){
              this.getResultTesting();
              Swal.fire('Respuestas guardadas correctamente.','','success');
            }
            else {
              // this._serviceNotification.notificationsSimple('No termino de responder todas las preguntas.', 'Info');
              this._serviceNotification.notificationsSimple('No termino de responder todas las preguntas.','warning');
            }
        //#endregion
      } else if (_result.isDenied) {
        // Swal.fire('Respuestas guardadas correctamente.','','info');
      }
    });
  }

  public removeResultAnswers(idResult: number):void{
    // console.log('REMOVER RESULT ID : ' + idResult);
    this._connectionService.deleteResult(idResult).subscribe({ next: (_response) => {

    }, error: (_error) => {

    }, complete:() => {

    }});
  }

  public obtRadioButtonValue(_datoAnswers: AnswersResponse, _idQuestions: number, _idSection: number, _bloque: String, _section: String):void{
    // console.log('DATO DEL RADIO BUTTON: ' + JSON.stringify(_datoAnswers) + ' - ' + _idQuestions + ' - ' + _idSection + ' - ' + _bloque + ' - ' + _section);
    let _agregacionAnswers : AnswersModelVerification = new AnswersModelVerification();
    if (_bloque === 'A') {
      if (_section === 'A'){
        //#region METODO DE VERIFICACION RESPUESTAS
        let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueA.filter(x => x.idQuestions === _idQuestions);
        // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
        if (_verificationsCheckQuestions.length > 0) {
          this._verificationModelQuestions._verifiSectionAbloqueA = this._verificationModelQuestions._verifiSectionAbloqueA.filter(X => X.idQuestions != _idQuestions);
          this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
          // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
          // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
        }
        let _resultRequest : ResultRequest = new ResultRequest();
        _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
        _resultRequest.ID_QUESTIONS = _idQuestions;
        _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
        this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
          _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
          _agregacionAnswers.idQuestions = _idQuestions;
          _agregacionAnswers.idResult = _response.ID_RESULT;
          this._verificationModelQuestions._verifiSectionAbloqueA.push(_agregacionAnswers);
          // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
          // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
        }, error: (_error) => {

        }, complete:() => {

        }});
        //#endregion
      }
      if (_section === 'B'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueB.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueB = this._verificationModelQuestions._verifiSectionAbloqueB.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueB.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'C'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueC.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueC = this._verificationModelQuestions._verifiSectionAbloqueC.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueC.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'D'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueD.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueD = this._verificationModelQuestions._verifiSectionAbloqueD.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueD.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'E'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueE.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueE = this._verificationModelQuestions._verifiSectionAbloqueE.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueE.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'F'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueF.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueF = this._verificationModelQuestions._verifiSectionAbloqueF.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueF.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'G'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueG.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueG = this._verificationModelQuestions._verifiSectionAbloqueG.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueG.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'H'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionAbloqueH.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionAbloqueH = this._verificationModelQuestions._verifiSectionAbloqueH.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionAbloqueH.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
    } else if (_bloque === 'B') {
      if (_section === 'A'){
        //#region METODO DE VERIFICACION RESPUESTAS
        let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueA.filter(x => x.idQuestions === _idQuestions);
        // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
        if (_verificationsCheckQuestions.length > 0) {
          this._verificationModelQuestions._verifiSectionBbloqueA = this._verificationModelQuestions._verifiSectionBbloqueA.filter(X => X.idQuestions != _idQuestions);
          this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
          // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
          // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
        }
        let _resultRequest : ResultRequest = new ResultRequest();
        _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
        _resultRequest.ID_QUESTIONS = _idQuestions;
        _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
        this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
          _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
          _agregacionAnswers.idQuestions = _idQuestions;
          _agregacionAnswers.idResult = _response.ID_RESULT;
          this._verificationModelQuestions._verifiSectionBbloqueA.push(_agregacionAnswers);
          // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
          // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
        }, error: (_error) => {

        }, complete:() => {

        }});
        //#endregion
      }
      if (_section === 'B'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueB.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueB = this._verificationModelQuestions._verifiSectionBbloqueB.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueB.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'C'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueC.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueC = this._verificationModelQuestions._verifiSectionBbloqueC.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueC.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'D'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueD.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueD = this._verificationModelQuestions._verifiSectionBbloqueD.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueD.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'E'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueE.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueE = this._verificationModelQuestions._verifiSectionBbloqueE.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueE.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'F'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueF.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueF = this._verificationModelQuestions._verifiSectionBbloqueF.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueF.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'G'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueG.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueG = this._verificationModelQuestions._verifiSectionBbloqueG.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueG.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
      if (_section === 'H'){
                //#region METODO DE VERIFICACION RESPUESTAS
                let _verificationsCheckQuestions = this._verificationModelQuestions._verifiSectionBbloqueH.filter(x => x.idQuestions === _idQuestions);
                // console.log('VERIFICACION EN ARRAY DEL FILTER: ' + _verificationsCheckQuestions.length);
                if (_verificationsCheckQuestions.length > 0) {
                  this._verificationModelQuestions._verifiSectionBbloqueH = this._verificationModelQuestions._verifiSectionBbloqueH.filter(X => X.idQuestions != _idQuestions);
                  this.removeResultAnswers(_verificationsCheckQuestions[0].idResult);
                  // console.log('ELIMINAR EL VALOR DEL ARRAY: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('ELIMINAR ID DEL QUESTIONS:' + JSON.stringify(_verificationsCheckQuestions));
                }
                let _resultRequest : ResultRequest = new ResultRequest();
                _resultRequest.ID_ANSWERS = _datoAnswers.ID_ANSWERS;
                _resultRequest.ID_QUESTIONS = _idQuestions;
                _resultRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
                this._connectionService.saveResult(_resultRequest).subscribe({ next: (_response) => {
                  _agregacionAnswers.idAnsweres = _datoAnswers.ID_ANSWERS;
                  _agregacionAnswers.idQuestions = _idQuestions;
                  _agregacionAnswers.idResult = _response.ID_RESULT;
                  this._verificationModelQuestions._verifiSectionBbloqueH.push(_agregacionAnswers);
                  // console.log('VERIFICACION DE PREGUNTAS: ' + JSON.stringify(this._verificationModelQuestions._verifiSectionAbloqueA));
                  // console.log('CANTIDAD DE PREGUNTAS RESPONDIDAS: ' + this._verificationModelQuestions._verifiSectionAbloqueA.length);
                }, error: (_error) => {

                }, complete:() => {

                }});
                //#endregion
      }
    }
  }
}
