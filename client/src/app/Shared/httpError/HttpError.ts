import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HttpError {

    constructor() { }
  
    
    public ErrorResponse(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          //errorMessage="Check the Network Connection"
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          //errorMessage="Server Side Error(Bad Request)";
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        // return throwError(
        //   'Something bad happened; please try again later.');
      };
     
  }
  