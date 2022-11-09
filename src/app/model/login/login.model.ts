
export class LoginRequest {
  public user !: string;
  public password !: string;
}

export class LoginResponse {
  public fullName !: string;
  public email !: string;
  public cellphone !: string;
  public dateOfBird !: string;
  public nameUser !: string;
  public password !: string;
  public verifyPassword !: string;
}


export class LoginVerify {
  public usuario !: string;
  public password !: string;
}
