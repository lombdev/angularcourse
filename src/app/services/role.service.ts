import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
  private rolesUrl = 'api/roles/roles.json';

  constructor(private http: HttpClient){
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.rolesUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
