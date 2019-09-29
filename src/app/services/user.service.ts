import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { isString, indexOf, isNil } from 'lodash';

import { environment } from '../../environments/environment';


let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    })
};

@Injectable()
export class UserService {
    private users = `${environment.apiUrl}/users`;
    constructor(private http: HttpClient) {
    }

    public signUp(data: object): Observable<any> {
        return this.http.post(this.users, data, httpOptions).pipe(
            catchError(this.handleError<any>(`users: ${this.users}`))
        );;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
