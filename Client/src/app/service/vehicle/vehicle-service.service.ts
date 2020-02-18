import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleModel } from '../../ClassModel/VehicleModel';
import { API_URL } from '../../app.constants';
import { InsurancePaymentModel } from '../../ClassModel/InsurancePaymentModel';
import { FuelPaymentModel } from '../../ClassModel/FuelPaymentModel';
import { VehicleCategoryModel } from '../../ClassModel/MapObject/VehicleCategory';
import { InstructorModel } from '../../ClassModel/InstructorModel';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(
    private http :HttpClient
  ) { }

  // getVehicleList(status:Number){
  //   return this.http.get<VehicleModel[]>(`${API_URL}/vehicles/${status}`);
  // }ssz

   // register the new vehicle
   VehicleAdd(vehicle:VehicleModel){
     console.log("------------------")
    console.log(vehicle);
    console.log("in vehicle service-service after adding");
    return this.http.post<VehicleModel>(`${API_URL}/vehicle/add`,vehicle);
    
  }

  //get VehicleList
  vehicleList(){
    console.log("vhcle list service");
      return this.http.get<VehicleModel[]>(`${API_URL}/vehicles`);  
  }

  getVehicleCategoryList(){
    console.log("vhcle list service getVehicleCategoryList");
    // console.log(vehicleCategorListData);
      return this.http.get<VehicleCategoryModel[]>(`${API_URL}/vehicles/vehiclecategory`);  
  }




  //get specific vehicle
  getVehicle(vehicleId){
    console.log(vehicleId)
    console.log("in getVehicle vhcle list service");
    return this.http.get<VehicleModel>(`${API_URL}/vehicle/${vehicleId}`); 
  }

    //Update Vehicle Data
    updateVehicle(vehicleId){
      return this.http.put<VehicleModel>(`${API_URL}/vehicle/update`,vehicleId);
    }

    deleteVehicle(vehicleId){
      console.log("in service vehicle del");
      return this.http.delete<any>(`${API_URL}/vehicle/${vehicleId}`);
    }

   


    addVehicleCategory(vehicleCategory:VehicleCategoryModel){
      console.log("vhcle list service AddVehicleCategory");
      console.log(vehicleCategory);
      return this.http.post<any>(`${API_URL}/vehicles/vehiclecategory/`,vehicleCategory);  
    }
   
   
  
  updateVehicleCategory(vehicleCategory:VehicleCategoryModel){
    console.log("vhcle list service updateVehicleCategory");
    console.log(vehicleCategory);
    return this.http.put<VehicleCategoryModel>(`${API_URL}/vehicles/vehiclecategory/`,vehicleCategory);  
  }

 

  deleteVehicleCategory(vehicleCategoryId){
    console.log(vehicleCategoryId);
    console.log("in service vehicle category del");
    return this.http.delete<any>(`${API_URL}/vehicles/vehiclecategory/${vehicleCategoryId}`);
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

  getInstructorbyVehicleID(vehicleId){
    return this.http.get<InstructorModel>(`${API_URL}/instructor/${vehicleId}`);

  }
}
