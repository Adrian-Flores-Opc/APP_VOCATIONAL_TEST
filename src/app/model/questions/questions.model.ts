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