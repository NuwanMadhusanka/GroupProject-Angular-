import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PaperModel } from '../../ClassModel/PaperModel';
import { StudentPaperModel} from '../../ClassModel/StudentPaperModel';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PaperMarksServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  //get paper List
  paperMarksList() {
    return this.http.get<StudentPaperModel[]>(`${API_URL}/paperMarks`);
  }

 
}
