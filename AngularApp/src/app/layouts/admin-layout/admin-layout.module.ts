import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { StaffListComponent } from '../../staff/staff-list/staff-list.component';
import { PackageListComponent } from '../../package/package-list/package-list.component';
import { ReportListComponent } from '../../report/report-list/report-list.component';
import { VehicleListComponent } from '../../vehicle/vehicle-list/vehicle-list.component';
import { StudentListComponent } from '../../student/student-list/student-list.component';
import { StudentAddComponent } from '../../student/student-add/student-add.component';
import { StudentPackageAddComponent } from '../../student/student-package-add/student-package-add.component';
import { StudentPaymentComponent } from '../../student/student-payment/student-payment.component';
import { StudentMoreDetailsComponent } from '../../student/student-more-details/student-more-details.component';
import { AdminStaffStudentDashBoardComponent } from '../../adminStaff/admin-staff-student-dash-board/admin-staff-student-dash-board.component';
import { StudentExamResultAddComponent } from '../../student/student-exam-result-add/student-exam-result-add.component';
import { TimeTableComponent } from '../../timeTable/time-table/time-table.component';
import { LessonAddComponent } from '../../timeTable/lesson-add/lesson-add.component';
import { TimeSlotComponent } from '../../timeTable/time-slot/time-slot.component';
import { PathMapComponent } from '../../timeTable/path-map/path-map.component';
import { LessonUpdateComponent } from '../../timeTable/lesson-update/lesson-update.component';
import { StudentProfileComponent } from '../../profile/student-profile/student-profile.component';
import { TrialLessonBookComponent } from '../../LessonBooking/trial-lesson-book/trial-lesson-book.component';
import { TrialLessonListComponent } from '../../LessonBooking/trial-lesson-list/trial-lesson-list.component';
import { PackageAnalysisComponent } from '../../timeTable/package-analysis/package-analysis.component';
import { InstructorTimeTableComponent } from '../../instructor/instructor-time-table/instructor-time-table.component';
import { LessonAssignStudentComponent } from '../../instructor/lesson-assign-student/lesson-assign-student.component';
import { PractricalLessonChartStudentComponent } from '../../instructor/practrical-lesson-chart-student/practrical-lesson-chart-student.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    StaffListComponent,
    PackageListComponent,
    ReportListComponent,
    VehicleListComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentPackageAddComponent,
    StudentPaymentComponent,
    StudentMoreDetailsComponent,
    AdminStaffStudentDashBoardComponent,
    StudentExamResultAddComponent,

    TimeTableComponent,
    LessonAddComponent,
    LessonUpdateComponent,
    TimeSlotComponent,
    PathMapComponent,
    PackageAnalysisComponent,
    
    TrialLessonBookComponent,
    TrialLessonListComponent,

    StudentProfileComponent,

    InstructorTimeTableComponent,
    LessonAssignStudentComponent,
    PractricalLessonChartStudentComponent
  ]
})

export class AdminLayoutModule {}
