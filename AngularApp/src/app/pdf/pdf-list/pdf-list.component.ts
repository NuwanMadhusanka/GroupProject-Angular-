import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../service/pdf/pdf-service.service';
import { PdfModel } from '../../ClassModel/PdfModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss']
})
export class PdfListComponent implements OnInit {

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
      pdf.pdfId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      pdf.adminStaffId.adminStaffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
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
        console.log(this.pdfs);
      },
      error => {
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

  //navigate to more details page of pdf
  moreDetails(pdfId) {
    console.log("in pdflistcomTS " + pdfId);
    this.router.navigate(['pdf-more-details', pdfId]);
  }

  addPdf() {
    console.log("In pdflist com ts 1");
    this.router.navigate(['pdf-add']);
    console.log("In pdflist com ts 2");
  }

  //delete Pdf
  deletePdf(pdfId: Number) {
    console.log("INpdfDelinCOMTS");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete PDF.Can't revert the Data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log("INpdfDelinCOMTS2");
        //Call to API
        this.pdfService.deletePdf(pdfId).subscribe(
          response => {
            this.pdfList();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'PDf id :' + pdfId + ' record was successfuly deldeted',
              showConfirmButton: false,
              timer: 3000
            });
          },
          error => {
            console.log("error");
            console.log(error);
            this.handleErrorResponse(error);
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'PDf id :' +pdfId + '\'s record was not successfuly deleted',
              showConfirmButton: false,
              timer: 3000
            });
          }

        )
      }
    })
  }

}
