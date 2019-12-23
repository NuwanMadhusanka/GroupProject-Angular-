import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(
    private http :HttpClient
  ) { }

  getVehicleList(status:Number){
    return this.http.get<VehicleModel[]>(`${API_URL}/vehicles/${status}`);
  }
}
