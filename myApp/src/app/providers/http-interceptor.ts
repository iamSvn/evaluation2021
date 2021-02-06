import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request body later ', request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        console.log(event, 'http interceptor')
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message);
      })
    );
  }
}
