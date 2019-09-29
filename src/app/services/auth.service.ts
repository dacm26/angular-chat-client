import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';
import { isString } from 'lodash';

import { environment } from '../../environments/environment';


let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    })
};

@Injectable()
export class AuthService {
    private loginURL = `${environment.apiUrl}/login`;
    private logoutURL = `${environment.apiUrl}/logout`;
    constructor(private http: HttpClient) {
    }

    public login(credentials: object, cb: (error, response) => void): any {
        return this.http.post(this.loginURL, credentials, httpOptions).subscribe(
            (response: any) => {
                if (response && response.data) {
                    sessionStorage.setItem('token', response.data);
                    cb(null, response);
                }
                else {
                    console.error('login failed: response is empty');
                    cb({
                        error: `User doesn't exists`
                    }, null);
                }
            },
            (error: any) => {
                console.log(`login failed: ${error.message}`);
                cb(error.error, null);
            }
        );
    }

    public logout(token: string = ''): Observable<any> {
        let options = httpOptions;
        options.headers.append('Authorization', token);
        return this.http.post(this.logoutURL, null, options).pipe(
            catchError(this.handleError<any>('logout'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem('token');
        if (isString(token)) {
            const payload: any = jwt_decode(token);
            const expirationDate = new Date(1000 * payload.exp);
            const today = new Date();
            if (expirationDate < today) {
                token = null;
                sessionStorage.removeItem('token');
            }
        }
        return token;
    }

    public getUser(): any {
        let user: any = null;
        const token: string = this.getToken();

        if (token) {
            user = jwt_decode(token);
        }

        return user;
    }

}
