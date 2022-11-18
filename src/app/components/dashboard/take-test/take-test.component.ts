import Swal from 'sweetalert2';
import { SectionsResponse } from './../../../model/sections/sections.model';
import { Component, OnInit } from '@angular/core';
import { ConeectionApiService } from 'src/app/core/service-connection/coneection-api.service';
import { QuestionsModelResul, QuestionsResponse, QuestionsResult } from 'src/app/model/questions/questions.model';
import { AnswersResponse } from 'src/app/model/answers/answers.model';
import { StorageService } from 'src/app/core/session/storage.service';
import { dataPuntuaction, Session } from 'src/app/model/session/session.model';
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



  constructor(private _connectionService: ConeectionApiService, private _storage: StorageService) { }

  ngOnInit(): void {
    // this._questionsResponse = new QuestionsResponse;
    this._puntuactionBloqueA = 0;
    this._puntuactionBloqueB = 0;
    this._resultQuestionsRequest = new ResultRequest();
    this._resultQuestionsResponse = new ResultResponse();
    this._modelQuestionsResult = new QuestionsModelResul();
    this._sessionResponse = this._storage.getCurrentSession();

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

    this.getQuestions();
    this.getAnswers();
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

  public checkAnswersVerify(_data: AnswersResponse, typeSection: String, section: String, _dataQuestions:QuestionsResult, evento:boolean, quesId: number, ansId: number):void{
    this.saveResultAnswers(_data.ID_ANSWERS,_dataQuestions.ID_QUESTIONS);
    if(typeSection === 'A'){
      switch(section){
        case 'A':
          // this._modelQuestionsResult.sectionATypeA[quesId].
          _dataQuestions.ANSWERS.forEach(element => {
            if(element.ID_ANSWERS != _data.ID_ANSWERS){
              element.CHECK = false;
            }
          });
          break;
        case 'B':
          break;
      }

    } else if (typeSection === 'B') {

    }
  }

  public saveResultAnswers(idAnswers: number, idQuestions: number):void{
    this._resultQuestionsRequest.ID_ANSWERS = idAnswers;
    this._resultQuestionsRequest.ID_QUESTIONS = idQuestions;
    this._resultQuestionsRequest.ID_TESTING = this._sessionResponse.idTestingIdentity;
    this._connectionService.saveResult(this._resultQuestionsRequest).subscribe({ next: (_response) => {
    }, error: (_error) => {

    }, complete: () => {

    }});
  }


  public getResultTesting():void{
    this._connectionService.getResul().subscribe({ next: (_response) => {
      this._resultCalculation = _response.filter(x => x.ID_TESTING == 19);
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
            this._puntuactionBloqueA = Math.max(this._sessionResponse.puntuactionBloqueASectionA, this._sessionResponse.puntuactionBloqueBSectionA,this._sessionResponse.puntuactionBloqueCSectionA,this._sessionResponse.puntuactionBloqueDSectionA,this._sessionResponse.puntuactionBloqueESectionA,this._sessionResponse.puntuactionBloqueFSectionA,this._sessionResponse.puntuactionBloqueGSectionA,this._sessionResponse.puntuactionBloqueHSectionA);
            this._sessionResponse.puntuactionSectionA = _comparationBloques;
            this._sessionResponse.puntuactionBloqueA = this._puntuactionBloqueA;
            this._storage.setCurrentSession(this._sessionResponse);
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
          }, error: (_error) => {

          }, complete: () => {

          }});
        }
      }, error: (_error) => {

      }, complete: () => {

      }});
    });
    this._sessionResponse = this._storage.getCurrentSession();
    this.getIntelligense(this._sessionResponse.puntuactionBloqueA, this._sessionResponse.puntuactionBloqueB, this._sessionResponse.puntuactionSectionA , this._sessionResponse.puntuactionSectionB);
  }

  public getIntelligense(_habilidadMayor:number,  _interesMayor: number, bloqueHabilidad: dataPuntuaction[],  _bloqueInteres:dataPuntuaction[]):void{
    let _habilidarMayorIntSec = bloqueHabilidad.filter(x => x.puntuaction == _habilidadMayor);
    let _interesMayorIntSec = _bloqueInteres.filter(x => x.puntuaction == _interesMayor);
    let _interesAct = _habilidadMayor;
    //#region VALIDARDOR ID INTELIGENCIA 1
    if(_habilidadMayor < 15 && _interesMayor >= 15){
      // ASIGNAR ID INTELIGENCIA 1
      this._sessionResponse.idInteligence = 1;
      this._storage.setCurrentSession(this._sessionResponse);
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 2
    if(_habilidadMayor >= 15 && _habilidadMayor <= 19 && _interesMayor >= 15){
      if  (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
          // ASIGNAR ID INTELIGENCIA 2
          this._sessionResponse.idInteligence = 2;
          this._storage.setCurrentSession(this._sessionResponse);
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 3
    if(_habilidadMayor > 15 && _habilidadMayor < 19 && _interesMayor > 15 && _interesMayor < 19){
      if (_habilidarMayorIntSec != _interesMayorIntSec){
        // ASIGNAR ID INTELIGENCIA 3
        this._sessionResponse.idInteligence = 3;
        this._storage.setCurrentSession(this._sessionResponse);
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 4
    if(_habilidadMayor > 18 && _interesMayor >= _interesAct && _interesMayor < 16){
      // ASIGNAR ID INTELIGENCIA 4
      this._sessionResponse.idInteligence = 4;
      this._storage.setCurrentSession(this._sessionResponse);
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 5
    if(_habilidadMayor > 18 && _interesMayor > 18 && _interesMayor < 24){
      if(_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 5
        this._sessionResponse.idInteligence = 5;
        this._storage.setCurrentSession(this._sessionResponse);
      }
    }
    //#endregion

    //#region  VALIDAR ID INTELIGENCIA 6
    if(_habilidadMayor > 18 && _interesMayor > 18 ){
      if (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 6
        this._sessionResponse.idInteligence = 6;
        this._storage.setCurrentSession(this._sessionResponse);
      }
    }
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 7
    if (_habilidadMayor > 18 && _interesMayor > 23){
      if (_habilidarMayorIntSec[0].bloque != _interesMayorIntSec[0].bloque){
        // ASIGNAR ID INTELIGENCIA 7
        this._sessionResponse.idInteligence = 7;
        this._storage.setCurrentSession(this._sessionResponse);
      }
    } 
    //#endregion

    //#region VALIDAR ID INTELIGENCIA 8
    if (_interesMayor < 15 && _habilidadMayor < 15){
      // ASIGNAR ID INTELIGENCIA 8
      this._sessionResponse.idInteligence = 8;
      this._storage.setCurrentSession(this._sessionResponse);
    }
    //#endregion
  }

  public confirmationSaveTestVocational():void{
    Swal.fire({
      title : '¿Desea Registrar sus respuestas?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Continuar Test'
    }).then((_result) => {
      if (_result.isConfirmed){
        this.getResultTesting();
        Swal.fire('Respuestas guardadas correctamente.','','success');
      } else if (_result.isDenied) {
        Swal.fire('Respuestas guardadas correctamente.','','info');
      }
    });    
  }
  onChangeEventFunc(_dato: AnswersResponse, isChecked: boolean){

  }
}
