import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StudentPaperModel } from '../../ClassModel/StudentPaperModel';
import { PaperQuestionModel } from '../../ClassModel/PaperQuestionModel';
import { PaperAnswerMap } from '../../ClassModel/MapObject/PaperAnswerMap';
import { API_URL } from '../../app.constants';


@Injectable({
  providedIn: 'root'
})
export class StudentPaperServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  //add new paper
  addStudentPaper(paperAnswer: StudentPaperModel,answers) {
    console.log("In Student paper Service add meth");
    console.log(paperAnswer);
    // for (var i = 0; i < paper.no_of_questions; i++) {
    //   for (var j = 0; j < paper.no_of_answers; j++) {
    //     //console.log(paper.no_of_answers);
    //     console.log(answers[i][j]);
    //   }
    // }
    //console.log(paper.no_of_questions);
    return this.http.post<StudentPaperModel>(`${API_URL}/studentPaper/add/${answers}`, paperAnswer);
  }

  // //get paper List
  // paperList() {
  //   return this.http.get<PaperModel[]>(`${API_URL}/papers`);
  // }

  // //Get Specific paper Details using paperID
  // getPaperbyID(paperId) {
  //   return this.http.get<PaperModel>(`${API_URL}/paper/${paperId}`);
  // }



  // deletePaper(paperId) {
  //   console.log("In paper Service delete meth");
  //   console.log(paperId);
  //   return this.http.delete<any>(`${API_URL}/paper/delete/${paperId}`);
  // }

  // //Update Paper Data
  // updatePaper(paper: PaperModel) {
  //   return this.http.put<PaperModel>(`${API_URL}/paper/update`, paper);
  // }

  // //get answers of paper
  // getAnswers(paperId) {
  //   return this.http.get<PaperQuestionModel[]>(`${API_URL}/paperquestions/${paperId}`);
  // }

  // //Update Answers of paper
  // // updateAnswers(paper: PaperModel, answers) {
  // //   console.log("In Updating answers");
  // //   console.log(paper);
  // //   return this.http.put<PaperModel>(`${API_URL}/paperAnswers/update/${answers}`, paper);
  // // }

  // updateAnswers(paperAnswer: PaperAnswerMap) {
  //   console.log("In Updating answers");
  //   console.log(paperAnswer.answers);
  //   var a=10;
  //   console.log(paperAnswer+"1");
  //   return this.http.post<PaperAnswerMap>(`${API_URL}/paperAnswers/update`, paperAnswer);
  // }

}
