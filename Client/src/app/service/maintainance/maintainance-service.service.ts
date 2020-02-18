import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleMaintainanceModel } from '../../ClassModel/MapObject/VehicleMaintainance';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class MaintainanceServiceService {

  constructor(
    private http :HttpClient
  ) { }


  
  maintainanceList(vehicleId){
    console.log("maintainance service maintainanceList");
    console.log(vehicleId);
      return this.http.get<VehicleMaintainanceModel[]>(`${API_URL}/maintainance/${vehicleId}`);  
  }

  addMaintainance(maintainance:VehicleMaintainanceModel){
    console.log("vhcle list service AddVehicleCategory");
    console.log(maintainance);
    return this.http.post<any>(`${API_URL}/maintainance/`,maintainance);  
  }

  deleteMaintainance(maintainanceId){
    console.log(maintainanceId);
    console.log("in service vehicle category del");
    return this.http.delete<any>(`${API_URL}/maintainance/${maintainanceId}`);
  }

  
//   addMaintainance(maintain:VehicleMaintainanceModel){
//     console.log("vhcle list service AddVehicleCategory");
//     console.log(maintain);
//     return this.http.post<any>(`${API_URL}/maintainance/`,maintain);  
//   }
 
 

// updateMaintainance(maintainanceId){
//   console.log("vhcle list service updateVehicleCategory");
//   return this.http.put<VehicleMaintainanceModel>(`${API_URL}/maintainance/`,maintainanceId);  
// }

// deleteMaintainance(maintainanceId){
//   console.log(maintainanceId);
//   console.log("in service vehicle category del");
//   return this.http.delete<any>(`${API_URL}/maintainance/${maintainanceId}`);
// }


}
