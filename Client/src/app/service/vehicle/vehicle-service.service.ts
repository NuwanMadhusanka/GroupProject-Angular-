import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { API_URL } from '../../app.constants';
import { InsurancePaymentModel } from '../../ClassModel/InsurancePaymentModel';
import { FuelPaymentModel } from '../../ClassModel/FuelPaymentModel';

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

  getVehicleInsurancePaymentDetails(vehicleId:Number){
    return this.http.get<InsurancePaymentModel[]>(`${API_URL}/vehicle/insurance/${vehicleId}`);
  }

  addInsurancePayment(vehicleId:Number,insurance:InsurancePaymentModel){
    return this.http.post<any>(`${API_URL}/vehicle/insurance/${vehicleId}`,insurance);
  }

  getFuelData(){
    return this.http.get<FuelPaymentModel[]>(`${API_URL}/vehicle/fuel`);
  }

  addVehicleFuelData(userId:Number,fuelData:FuelPaymentModel){
    return this.http.post<any>(`${API_URL}/vehicle/fuel/${userId}`,fuelData);
  }
}
