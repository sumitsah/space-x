import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpaceXService {

  constructor(private _http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error); 
  }
  
  getSpaceXData():Observable<any> {
    return this._http.get("https://api.spaceXdata.com/v3/launches?limit=10")
              .pipe(catchError(this.formatErrors));
  }

  getLaunchSuccessSpaceData(isLaunch):Observable<any> {
    return this._http.get(`https://api.spaceXdata.com/v3/launches?limit=20&launch_success=${isLaunch}`)
              .pipe(catchError(this.formatErrors));
  }

  getLaunchLandSpaceData(isLaunch):Observable<any> {
    return this._http.get(`https://api.spaceXdata.com/v3/launches?limit=20&launch_success=true&land_success=${isLaunch}`)
              .pipe(catchError(this.formatErrors));
  }

  /*This end-point returns the empty array for most of the year
    Working:- try (2019) below url in the browser
  */
  getAllSpaceData(year):Observable<any> {
    return this._http.get(`https://api.spaceXdata.com/v3/launches?limit=50&launch_success=true&land_success=true&launch_year=`+year)
              .pipe(catchError(this.formatErrors));
  }
  

  
}
