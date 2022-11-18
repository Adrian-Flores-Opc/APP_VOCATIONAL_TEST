import { SectionsResponse } from './../../model/sections/sections.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/app/model/login/login.model';
import { QuestionsResponse } from 'src/app/model/questions/questions.model';
import { AnswersResponse } from 'src/app/model/answers/answers.model';
import { RegisterUserRequest } from 'src/app/model/register/register-user.model';
import { TestingResponse } from 'src/app/model/testing/testing.model';
import { ResultRequest, ResultResponse } from 'src/app/model/result/result.model';

@Injectable({
  providedIn: 'root'
})
export class ConeectionApiService {
  readonly rootUrl !: string;

  constructor(private http: HttpClient) { this.rootUrl = environment.apiEndPoint; }

  // CONEXION METODOS USUARIOS
  public validateAuthorizate(): Observable<LoginResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<LoginResponse[]>(this.rootUrl + 'UserRegisterController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials}).pipe(catchError(this.handleError));
  }

  public saveUserRegister(_datos: RegisterUserRequest) : Observable<RegisterUserRequest>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.post<RegisterUserRequest>(this.rootUrl + 'UserRegisterController/api/v1/Save',
    _datos,{
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }, withCredentials
    })
    .pipe(catchError(this.handleError));
  }

  //CONEXCION METODOS PREGUNTAS

  public getQuestions(): Observable<QuestionsResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<QuestionsResponse[]>(this.rootUrl + 'QuestionsController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  public getQuestionsById(id:number): Observable<QuestionsResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<QuestionsResponse>(`${this.rootUrl}QuestionsController/api/v1/ById/${id}`, { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  //CONEXION METODOS DE RESPUESTAS
  public getAnswers(): Observable<AnswersResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<AnswersResponse[]>(this.rootUrl + 'AnswersController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }
  public getAnswersById(id:number): Observable<AnswersResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<AnswersResponse>(`${this.rootUrl}AnswersController/api/v1/ById/${id}`, { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  // CONEXION METODOS DE SECCIONES
  public getSections(): Observable<SectionsResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<SectionsResponse[]>(this.rootUrl + 'SectionsController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }


  // CONEXION METODOS DE TESTING 
  public getTesting(): Observable<TestingResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<TestingResponse[]>(this.rootUrl + 'TestingController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  public getTestingById(id:number): Observable<TestingResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<TestingResponse>(`${this.rootUrl}TestingController/api/v1/ById/${id}`, { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  public saveTesting(_datos: TestingResponse): Observable<TestingResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.post<TestingResponse>(this.rootUrl + 'TestingController/api/v1/Save',
    _datos,{
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }, withCredentials
    })
    .pipe(catchError(this.handleError));
  }

  //CONEXION METODOS DE GUARDAR RESPUESTAS 
  
  public getResul(): Observable<ResultResponse[]>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.get<ResultResponse[]>(this.rootUrl + 'ResultController/api/v1/List', { headers : {'Access-Control-Allow-Origin':'*'}, withCredentials } ).pipe(catchError(this.handleError));
  }

  public saveResult(_datos: ResultRequest): Observable<ResultResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.post<ResultResponse>(this.rootUrl + 'ResultController/api/v1/Save',
    _datos,{
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }, withCredentials
    })
    .pipe(catchError(this.handleError));
  }


  public updateTesting(_datos: TestingResponse): Observable<TestingResponse>{
    const withCredentials = false;
    let headers = new HttpHeaders();
    return this.http.put<TestingResponse>(`${this.rootUrl}TestingController/api/v1/Update/${_datos.ID_TESTING}`,
    _datos,{
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }, withCredentials
    })
    .pipe(catchError(this.handleError));
  }

  public handleError(message: HttpErrorResponse){
    let errorMessage = 'UNKNOWN ERROR';
    if(message.error instanceof ErrorEvent) {
      errorMessage = ('ERROR: '+ message.error.message);
    } else {
      errorMessage = ('ERROR CODE: '+ message.status + ' MESSAGE:' + message.error);
    }
    return throwError(errorMessage);
  }
}
