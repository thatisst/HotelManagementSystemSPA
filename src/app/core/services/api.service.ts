import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers!: HttpHeaders
  constructor(protected http: HttpClient) { }

  listAll(path: string): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}${path}`).pipe(
      map((response: any) => response)
    )
  }

  create(path: string, resource: any, options?: HttpHeaders): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, resource, { headers: this.headers })
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  update(path: string, resource: any): Observable<any> {
    return this.http
      .put(
        `${environment.apiUrl}${path}` + '/' + resource.id,
        JSON.stringify({ isRead: true })
      )
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(path: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}` + '/' + id).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }


  getOne(path: string, id?: number, queryParams?: Map<any, any>): Observable<any> {
    let getUrl: string;
    if (id) {
      getUrl = `${environment.apiUrl}${path}` + '/' + id;
    } else {
      getUrl = `${environment.apiUrl}${path}`;
    }

    let params = new HttpParams();
    if (queryParams) {
      queryParams.forEach((value: string, key: string) => {
        params = params.append(key, value);
      });
    }

    return this.http.get(getUrl, { params }).pipe(
      map(resp => resp as any),
      catchError(this.handleError)
    );
  }

  getById(path:string, id?:number) : Observable<any>{
    return this.http.get(`${environment.apiUrl}${path}`+ '/' + id).pipe(
      map(resp => resp as any)
    )

  }

  // Any non-successfull http status codes such as 400,400,403,404,500,503 etc will be wrapped in HttpErrorResponse
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error.error.errorMessage);
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.message}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error.errorMessage);

  }

}
