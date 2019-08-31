import { Component, OnInit } from '@angular/core';
import { TimeTableServiceService } from '../../service/TimeTable/time-table-service.service';
import { Path } from '../../ClassModel/PathModel';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError } from '../../Shared/httpError/HttpError';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-path-map',
  templateUrl: './path-map.component.html',
  styleUrls: ['./path-map.component.scss']
})
export class PathMapComponent implements OnInit {

  errorMessage;

  pathList:Path[]=[];
  subPathList:String[]=[];
  isSubPathHas=false;

  isAddMap=false;
  newMap:Path=new Path(-1,""," ","");
  errorPathName;
  errorOrigin;
  errorDestination;
  
  newSubPath="";
  newsubPaths=[];
  errorSubPath;

  updateMap:Path;
  updateSubPaths:String[]=[];
  isUpdateMap=false;
  isUpdateSubpath=false;


  constructor(
    private timeTableService:TimeTableServiceService
  ) { }

  ngOnInit() {
    this.getPathList();
  }

  //getPathDetails
  getPathList(){
    this.timeTableService.getPathList().subscribe(
      response => {
        this.pathList=response;
      },
      error => {
        console.error(error);
        this.handleErrorResponse(error);
      }
    )
  }

  //subPathList
  getSubPathList(pathId){
    this.isSubPathHas=false;
    this.timeTableService.getSubPathList(pathId).subscribe(
      response => {
        this.subPathList=response;
        if(this.subPathList.length >0){
          this.isSubPathHas=true;
        }
      },
      error => {
        console.log(error);
        this.handleErrorResponse(error);
      }
    );
  }

  //buttons
  googleMap(map:Path,type){
    if(map.origin == ""){
      this.errorOrigin="Origin is mandatory";
    }
    if(map.destination == ""){
      this.errorDestination="Destination is mandatory.";
    }

    if( (map.origin != "") && (map.destination!="")){
      let mapUrl="https://www.google.com/maps/"+
              "dir/?api=1&origin="+map.origin+
              "&destination="+map.destination+
              "&travelmode=driving";

      //select type
      let subPaths:String[]=[];
      if(type==1){
        this.getSubPathList(map.pathId);
        this.delay(1000).then(any=>{
          subPaths=this.subPathList;
          mapUrl=this.subPathUrl(mapUrl,subPaths);
          console.log(mapUrl);
          window.open(""+mapUrl, "_blank"); 
        });
      }else if(type==2){
        subPaths=this.newsubPaths;
        mapUrl=this.subPathUrl(mapUrl,subPaths);
        console.log(mapUrl);
        window.open(""+mapUrl, "_blank"); 
      }else if(type==3){
        subPaths=this.updateSubPaths;
        mapUrl=this.subPathUrl(mapUrl,subPaths);
        console.log(mapUrl);
        window.open(""+mapUrl, "_blank"); 
      }
    }
   
  }

  subPathUrl(mapUrl,subPaths){
    if(subPaths.length >0){
      mapUrl+="&waypoints=";
    
      let i=0;
      subPaths.forEach(element => {
        if(i == subPaths.length-1){
          mapUrl+=element;
        }else{
          mapUrl+=element+"%7C";
        }
        i++;
      });
      return mapUrl;
    }
    return mapUrl;
  }

  addMap(){
    this.newMap.origin="";
    this.newMap.destination="";
    this.isAddMap=true;
  }

  addSubPath(){
    this.errorSubPath="";
    if(this.newSubPath != ""){
        this.newsubPaths.push(this.newSubPath);
    }else{
         this.errorSubPath="Insert Valid Path";
    }
    this.newSubPath="";
  }

  saveConfirm(){
    this.errorPathName="";
    this.errorOrigin="";
    this.errorDestination="";

    //validation
    if(this.newMap.pathName == ""){
      this.errorPathName="Path Name is mandatory.";
    }
    if(this.newMap.origin == ""){
      this.errorOrigin="Origin is mandatory.";
    }
    if(this.newMap.destination == ""){
      this.errorDestination="Destination is mandatory."
    }

    if( (this.errorPathName == "") && (this.errorOrigin == "") && (this.errorDestination == "")){
      console.log(this.newMap);
      //save newMap Data
      this.timeTableService.addPath(this.newMap).subscribe(
        response => {
          let pathId=response;
          
          if(this.newsubPaths.length>0){
              //save the subpath
              this.timeTableService.addSubPath(pathId,this.newsubPaths).subscribe(
                response =>{
                  Swal.fire('Submission is Completed.');
                  this.newMap.pathName="";
                  this.newMap.origin="";
                  this.newMap.destination="";

                  this.newsubPaths=[];
                  this.isAddMap=false;
                  this.getPathList();
                },
                error => {
                  //delete Path
                  this.timeTableService.deletePath(pathId).subscribe();

                  Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'submission is not Successful!',
                    footer: 'Something bad happened, please try again later.'
                  });
                  console.log(error);
                  this.handleErrorResponse(error);
                }
              );
          }else{
                Swal.fire('Submission is Completed.');
          }
        },
        error => {
          console.error(error)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'submission is not Successful!',
            footer: 'Something bad happened, please try again later.'
          });
        }
      )
      
    
    }
  }

  deletePath(){

  }

  isUpdate(path:Path){
    this.isUpdateMap=true;
    this.updateMap=new Path(path.pathId,path.pathName,path.origin,path.destination);
    this.getSubPathList(path.pathId);
        this.delay(1000).then(any=>{
          this.updateSubPaths=this.subPathList;
          if(this.updateSubPaths.length > 0){
            this.isUpdateSubpath=true;
          }
        });
  }

  closeAddMap(){
    this.isAddMap=false;
  }

  clearSubPath(){
    this.newsubPaths=[];
  }

  closeUpdateMap(){
    this.isUpdateMap=false;
  }

  handleErrorResponse(error: HttpErrorResponse) {
    //this.errorMessage="There is a problem with the service. please try again later.";
    let httpError = new HttpError();
    httpError.ErrorResponse(error);
  };

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
}
