import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperServiceService } from '../../service/paper/paper-service.service';
import { PaperModel } from '../../ClassModel/PaperModel';
import Swal from 'sweetalert2';
import { HttpError } from '../../Shared/httpError/HttpError';
import { UserValidation } from '../../Shared/validation/user-validation/user-validation';
import { API_URL, WEBSOCKETENDPOINT, WEBSOCKETTOPIC } from '../../app.constants';


@Component({
  selector: 'app-paper-list-for-students',
  templateUrl: './paper-list-for-students.component.html',
  styleUrls: ['./paper-list-for-students.component.scss']
})
export class PaperListForStudentsComponent implements OnInit {

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
    this.router.navigate(['paper-answer-sheet', paperId]);
    // console.log(this.router.navigate(['paper-more-details',paperId]));
  }

  
}
