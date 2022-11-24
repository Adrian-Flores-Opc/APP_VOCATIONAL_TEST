import { AnswersResponse } from "../answers/answers.model";

export class Questions {
}


export class QuestionsResponse{
  public ID_QUESTIONS !: number;
  public ID_SECTION !: number;
  public QUESTIONS !: String;
  public REGISTRATION_DATE !: String;
  public PUNTUACTION !:number;
  public ANSWERS!: AnswersResponse[];
}


export class QuestionsResult{
  public ID_QUESTIONS !: number;
  public ID_SECTION !: number;
  public QUESTIONS !: String;
  public PUNTUACTION !:number;
  public ANSWERS!: AnswersResponse[];
}


export class QuestionsModelResul{
  public sectionATypeA !: QuestionsResult[];
  public sectionBTypeA !: QuestionsResult[];
  public sectionCTypeA !: QuestionsResult[];
  public sectionDTypeA !: QuestionsResult[];
  public sectionETypeA !: QuestionsResult[];
  public sectionFTypeA !: QuestionsResult[];
  public sectionGTypeA !: QuestionsResult[];
  public sectionHTypeA !: QuestionsResult[];
  public sectionATypeB !: QuestionsResult[];
  public sectionBTypeB !: QuestionsResult[];
  public sectionCTypeB !: QuestionsResult[];
  public sectionDTypeB !: QuestionsResult[];
  public sectionETypeB !: QuestionsResult[];
  public sectionFTypeB !: QuestionsResult[];
  public sectionGTypeB !: QuestionsResult[];
  public sectionHTypeB !: QuestionsResult[];
}

export class QuestionsModelVerification {
  public _verifiSectionAbloqueA : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueB : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueC : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueD : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueE : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueF : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueG : AnswersModelVerification[] = [];
  public _verifiSectionAbloqueH : AnswersModelVerification[] = [];

  public _verifiSectionBbloqueA : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueB : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueC : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueD : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueE : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueF : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueG : AnswersModelVerification[] = [];
  public _verifiSectionBbloqueH : AnswersModelVerification[] = [];
}

export class AnswersModelVerification {
  public idQuestions !: number;
  public idAnsweres !: number;
}