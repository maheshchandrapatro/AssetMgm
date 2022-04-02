import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL =environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body:{}
  }
  get: any;
  constructor(private http: HttpClient, private router: Router) {

  }


  getData(url:string):any{
    return this.http.get(this.API_URL + url)
      .pipe(
        catchError((err) => this.errorHandler(err))
      );
  }

  getById(url:string,id:string): Observable<any> {
    return this.http.get<any>(this.API_URL + url + id, this.httpOptions)
    .pipe(
      catchError((err) => this.errorHandler(err))
    )
  }

  create(url:string,data:string): Observable<any> {
        return this.http.post<any>(this.API_URL + url, data, this.httpOptions)
        .pipe(
          catchError((err) => this.errorHandler(err))
        )
  }  

  update(url:string, data:string): Observable<any> {
    return this.http.put<any>(this.API_URL +url, data, this.httpOptions)
    .pipe(
      catchError((err) => this.errorHandler(err))
    )
  }

  delete(url:string,id:string){
    return this.http.delete<any>(this.API_URL+ url  + id, this.httpOptions)
    .pipe(
      catchError((err) => this.errorHandler(err))
    )
  }

  errorHandler(error:any):any {
    if (error.status === 401 || error.status == 403) {
     // console.log(error);
      alert('Session expired. Please login again');
      //logout();
    }
    else {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        if (error.statusCode != undefined && error.message != undefined) {
          errorMessage = `Error Code: ${error.statusCode}\nMessage: ${error.message}`;
        } else {
          // Get server-side error
          errorMessage = `Error Message: ${error}`;
        }
      }
     // console.log(errorMessage);
      return throwError("Oops! Due to technical error, unable to process the request.");
    }
  }

}




