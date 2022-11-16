import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from '../session/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _authService: StorageService, private _router: Router) { }

  canActivate(): Observable<boolean>{
    const _isAuthenticatin = this._authService.isAuthenticated();
    if (!_isAuthenticatin) {
      this._router.navigate(['Home']);
      return of(false);
    } 
    return of (true);
  }
}
