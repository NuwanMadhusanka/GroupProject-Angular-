import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(
    private http :HttpClient
  ) { }

  getMonthlyProfit(){
    return this.http.get<[]>(`${API_URL}/month/profit`);
  }

  getMonthlySalaryExpenses(){
    return this.http.get<[]>(`${API_URL}/salary/month/payment`);
  }

  getFuelExpenses(){
    return this.http.get<[]>(`${API_URL}/fuel/month/payment`);
  }

  getInsuranceExpenses(){
    return this.http.get<[]>(`${API_URL}/insurance/month/payment`);
  }

  getIncome(){
    return this.http.get<[]>(`${API_URL}/student/month/payment`);
  }
}
