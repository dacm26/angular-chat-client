import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { isString } from 'lodash';

import { environment } from '../../environments/environment';


let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    })
};

@Injectable()
export class RoomService {
    private rooms = `${environment.apiUrl}/rooms`;
    constructor(private http: HttpClient) {
    }

    public create(data: object): Observable<any> {
        return this.http.post(this.rooms, data, httpOptions).pipe(
            catchError(this.handleError<any>(`rooms: ${this.rooms}`))
        );
    }

    public findAll(queryParams?: string): Observable<any> {
        const url = this.rooms + (isString(queryParams) ? queryParams : '');
        return this.http.get(url, httpOptions).pipe(
            catchError(this.handleError<any>(`rooms: ${url}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
