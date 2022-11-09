import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {
  public headerEvetEmmiter = new BehaviorSubject<boolean>(false);
  constructor() { }
}
