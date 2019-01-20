import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                switch (err.status) {
                    case 404:
                        this.toastr.error('No such resource found ☹️', err.status.toString());
                        break;
                    case 500:
                        this.toastr.error('An unknown server error has occurred ☹️', err.status.toString());
                        break;
                }
                return throwError(err);
            })
        );
    }
}