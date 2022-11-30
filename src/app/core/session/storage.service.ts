import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/model/login/login.model';
import { Session } from 'src/app/model/session/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _localStorageService: any;
  private _currenSession !: Session;

  private _currenSessionNull !: Session;
  constructor(private _router: Router) { 
    this._localStorageService = localStorage;
    this._currenSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this._currenSession = session;
    this._localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session {
    var sessionStr = this._localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session>JSON.parse(sessionStr) : this._currenSessionNull;
  }
  getCurrentSession(): Session {
    return this._currenSession;
  }
  removeCurrentSession(): void {
    this._localStorageService.removeItem('currentUser');
    this._currenSession != null;
  }
  getCurrentUser(): Session {
    var session: Session = this.getCurrentSession();
    return (session) ? session : this._currenSessionNull;
  }
  isAuthenticated(){
    const value = (this.getCurrentToken() != null) ? true : false;
    return value;
  }
  getCurrentToken(): String {
    var session = this.getCurrentSession();
    if (session != null) {
      return (session && session.tokenIdentity) ? session.tokenIdentity : '';
    } else {
      return '';
    }
  }
  logout(): void {
    this.removeCurrentSession();
    this._router.navigate(['/Home']);
  }

  logoutSession(): void {
    this.removeCurrentSession();
  }
}
