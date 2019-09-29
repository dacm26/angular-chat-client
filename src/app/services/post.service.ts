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
export class PostService {
    private posts = `${environment.apiUrl}/posts`;
    constructor(private http: HttpClient) {
    }

    public create(data: object): Observable<any> {
        return this.http.post(this.posts, data, httpOptions).pipe(
            catchError(this.handleError<any>(`posts: ${this.posts}`))
        );
    }

    public findAll(queryParams?: string): Observable<any> {
        const url = this.posts + (isString(queryParams) ? queryParams : '');
        return this.http.get(url, httpOptions).pipe(
            catchError(this.handleError<any>(`posts: ${url}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
