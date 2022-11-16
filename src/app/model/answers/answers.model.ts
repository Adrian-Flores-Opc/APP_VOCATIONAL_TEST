export class Answers {
  public ID_ANSWERS!: number;
  public ANSWERS!: String;
  public PUNCTUATION !: number;
  public TYPE_ANSWERS !: String;
}

export class AnswersResponse{
  public ID_ANSWERS!: number;
  public ANSWERS!: String;
  public PUNCTUATION !: number;
  public TYPE_ANSWERS !: String;
  public CHECK : boolean = true;
}
