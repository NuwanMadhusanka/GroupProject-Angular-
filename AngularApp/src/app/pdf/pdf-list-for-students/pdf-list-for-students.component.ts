import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../service/pdf/pdf-service.service';
import { PdfModel } from '../../ClassModel/PdfModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-pdf-list-for-students',
  templateUrl: './pdf-list-for-students.component.html',
  styleUrls: ['./pdf-list-for-students.component.scss']
})
export class PdfListForStudentsComponent implements OnInit {

  errorMessage = "";
  pdfs: PdfModel[] = [];

  validation: UserValidation = new UserValidation();
  apiUrl = API_URL;

  //Filter Option Implement
  filteredPdf: PdfModel[] = [];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredPdf = this.filterPdf(value);
  }

  //Filtering method
  filterPdf(searchString: string) {
    return this.pdfs.filter(pdf =>
     // pdf.pdfId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
     // pdf.adminStaffId.adminStaffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.addedDate.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );

  }

  constructor(
    private router: Router,
    private pdfService: PdfServiceService,



  ) { }

  ngOnInit() {
    this.pdfList();
  }

  //to get the list of Pdfs
  pdfList() {

    this.pdfService.pdfList().subscribe(
      response => {
        this.pdfs = response;
        this.filteredPdf = this.pdfs;
        //for(let pdf of this.pdfs){
        console.log(this.pdfs);
        // }
        // this.handleErrorResponse(this.pdfs[0].adminStaff==null);
      },
      error => {
        //this.errorMessage=response;
        this.handleErrorResponse(error);
      }
    )
  }
  handleErrorResponse(error) {
    this.errorMessage = error;
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  }
  closeError() {
    this.errorMessage = "";
  }

  
}
