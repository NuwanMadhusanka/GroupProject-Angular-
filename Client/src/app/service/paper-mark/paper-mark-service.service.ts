import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentPaperModel } from '../../ClassModel/StudentPaperModel';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PaperMarkServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  //get paper List
  paperMarksList() {
    return this.http.get<StudentPaperModel[]>(`${API_URL}/paperMarks`);
  }
}
