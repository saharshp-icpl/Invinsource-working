import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private local: LocalService) { }

  isNotLoggedIn(){
    return !this.local.getData('token');
  }

  logout() {
    this.local.clearData();
  }

}
