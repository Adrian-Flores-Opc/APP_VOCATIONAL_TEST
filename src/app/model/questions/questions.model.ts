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
