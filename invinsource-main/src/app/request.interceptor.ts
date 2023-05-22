import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from './shared/local.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private local: LocalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const email = this.local.getData('email');
    if(email) {
      const token = JSON.parse(this.local.getData('token'));
      if(token && token.access_token){
        const headers = new HttpHeaders({
          'Authorization': token.access_token
        });
        const newRequest = request.clone({headers});
        return next.handle(newRequest);
      }
    }
    return next.handle(request);
  }
}