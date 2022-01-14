import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user = new BehaviorSubject<any>('');

  constructor() { }

  getUser(){
    return this.user.asObservable();
  }

}
