import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { FileSaver } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  constructor(
    private http: HttpClient
  ) { }

  /*
  type--> 1 = userProfileImage
          2 = PDF
  */
  fileUpload(file: File, userId: Number, type: number) {
    console.log("In file uploading File service");
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post<Number>(`${API_URL}/file/upload/${userId}/${type}`, formdata);
  }

  // downLoadProfilePicture(userId){
  //   return this.http.get<any>(`${API_URL}/api/file/${userId}`);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${API_URL}/api/file/all`);
  // }

  downLoadPdf(pdfId) {  //method to load pdf //error
       // console.log(this.http.get<any>(`${API_URL}/api/file/${pdfId}/2`));

    // src="{{apiUrl}}/api/file/{{pdfData.pdfId}}/2"
    //return FileSaver.saveAs(this.http.get<any>(`${API_URL}/api/file/${pdfId}/2`), 'my_file_name.pdf');
    return this.http.get<any>(`${API_URL}/api/file/${pdfId}/2`);
   // var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
//FileSaver.saveAs(file);
 }

 downLoadPaper(paperId) { 
   return this.http.get<any>(`${API_URL}/api/file/${paperId}/3`);
   
 }

}
