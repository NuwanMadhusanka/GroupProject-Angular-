import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalaryInformationModel } from '../../ClassModel/SalaryInformationModel';
import { API_URL } from '../../app.constants';
import { StaffRole } from '../../ClassModel/MapObject/StaffRole';

@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {

  constructor(
    private http : HttpClient
  ) { }

  getStaffSalaryInformationList(){
    return this.http.get<SalaryInformationModel[]>(`${API_URL}/staff/salary/information`);
  }

  getStaffSalaryInformation(salaryInformationId:Number){
    return this.http.get<SalaryInformationModel>(`${API_URL}/staff/salary/information/${salaryInformationId}`);
  }

  addStaffSalaryInformation(salaryInformation:SalaryInformationModel){
    return this.http.post<any>(`${API_URL}/staff/salary/information`,salaryInformation);
  }

  updateStaffSalaryInformation(salaryInformation:SalaryInformationModel){
    return this.http.put<any>(`${API_URL}/staff/salary/information`,salaryInformation);
  }

  deleteStaffSalaryInfromation(salaryInformationId:Number){
    return this.http.delete<any>(`${API_URL}/staff/salary/information/${salaryInformationId}`);
  }

}
