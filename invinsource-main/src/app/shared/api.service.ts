import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getAllProfiles(){
    return this.http.get(`${this.apiUrl}/users`);
  }

  public getUserProfile(reqBody: any){
    return this.http.post(`${this.apiUrl}/users/get-user-profile`,reqBody);
  }

  public createProfile(reqBody: any){
    return this.http.post(`${this.apiUrl}/register`,reqBody);
  }

  public login(reqBody: any){
    return this.http.post(`${this.apiUrl}/auth`,reqBody);
  }
  public confirmSignUp(reqBody: any){
    return this.http.post(`${this.apiUrl}/confirmsignup`,reqBody);
  }
  public logout(reqBody: any){
    return this.http.post(`${this.apiUrl}/auth`,reqBody);
  }

  public forgotPassword(reqBody: any){
    return this.http.post(`${this.apiUrl}/auth/recover`,reqBody);
  }

  public confirmForgotPassword(reqBody: any){
    return this.http.post(`${this.apiUrl}/auth/confirm-forgot-password-code`,reqBody);
  }

  public updateProfile(id: any, reqBody: any){
    return this.http.post(`${this.apiUrl}/users/${id}`,reqBody);
  }
  public disableUser(reqBody: any){
    return this.http.post(`${this.apiUrl}/disableuser`,reqBody);
  }
  public globalLogout(reqBody: any){
    return this.http.post(`${this.apiUrl}/users/global-signout`,reqBody);
  }

}
