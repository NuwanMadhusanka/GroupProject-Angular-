import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperServiceService } from '../../service/learning-material/paper/paper-service.service';
import { PaperModel } from '../../ClassModel/PaperModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.scss']
})
export class PaperListComponent implements OnInit {

  errorMessage = "";
  papers: PaperModel[] = [];

  validation: UserValidation = new UserValidation();

  //Filter Option Implement
  filteredPaper: PaperModel[] = [];
  private _searchTerm: string;
  apiUrl = API_URL;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredPaper = this.filterPaper(value);
  }

  //Filtering method
  filterPaper(searchString: string) {
    return this.papers.filter(paper =>
      paper.paperId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      paper.title.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      //paper.description.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      paper.adminStaffId.adminStaffId.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1 ||
      paper.addedDate.toString().toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1
    );

  }

  constructor(
    private router: Router,
    private paperService: PaperServiceService,



  ) { }

  ngOnInit() {
    this.paperList();
  }

  //to get the list of Papers
  paperList() {

    this.paperService.paperList().subscribe(
      response => {
        this.papers = response;
        this.filteredPaper = this.papers;
        //for(let paper of this.papers){
        console.log(this.papers);
        // }
        // this.handleErrorResponse(this.papers[0].adminStaff==null);
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

  //navigate to more details page of paper
  moreDetails(paperId) {
    console.log("in paperlistcomTS " + paperId);
    this.router.navigate(['paper-more-details', paperId]);
    // console.log(this.router.navigate(['paper-more-details',paperId]));
  }

  addPaper() {
    console.log("In paperlist com ts 1");
    this.router.navigate(['paper-add']);
    console.log("In paperlist com ts 2");
  }

  //delete Paper
  deletePaper(paperId: Number) {
    console.log("INpaperDelinCOMTS");
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Paper.Can't revert the Data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log("INpaperDelinCOMTS2");
        //Call to API
        this.paperService.deletePaper(paperId).subscribe(
          response => {
            this.paperList();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'PDf id :' + paperId + ' record was successfuly deldeted',
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
              title: 'PDf id :' +paperId + '\'s record was not successfuly deleted',
              showConfirmButton: false,
              timer: 3000
            });
          }

        )
      }
    })
  }



  /*
    //navigate to studentRegister Page
    addStudent(){
        this.router.navigate(['student-add'])
    }
  
   
  
    //navigate to student-package
    addPackage(studentId:Number){
      console.log(studentId);
      this.router.navigate(['student-package-add',studentId])
    }
  
    //navigate to student-payment 
    addPayment(studentId){
      this.router.navigate(['student-payment',studentId])
    }
  
    //navigate to more details page
    
  
    
  
    handleErrorResponse(error){
      this.errorMessage="There is a problem with the service. please try again later.";
      let httpError = new HttpError();
      httpError.ErrorResponse(error);
    }
  */
}
