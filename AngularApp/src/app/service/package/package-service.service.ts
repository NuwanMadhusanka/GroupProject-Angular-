import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PackageModel } from '../../ClassModel/PackageModel';



@Injectable({
  providedIn: 'root'
})
export class PackageServiceService {

  constructor(
    private http:HttpClient
  ) { }

  public packageList(){
    return this.http.get<PackageModel[]>('http://localhost:8080/packages');
  }
}
