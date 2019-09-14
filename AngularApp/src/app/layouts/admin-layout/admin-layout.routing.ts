import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
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


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {path:'staff-list',       component:StaffListComponent},
    {path:'package-list',     component:PackageListComponent},
    {path:'report-list',     component:ReportListComponent},
    {path:'vehicle-list',     component:VehicleListComponent},
    {path:'student-list',     component:StudentListComponent},
    {path:'student-add',     component:StudentAddComponent},
    {path:'student-package-add/:id',     component:StudentPackageAddComponent},
    {path:'student-payment/:id',     component:StudentPaymentComponent},
    {path:'student-more-details/:id',   component:StudentMoreDetailsComponent},
    {path:'admin-staff-student-dash-board',   component:AdminStaffStudentDashBoardComponent},
    {path:'student-exam-result-add',     component:StudentExamResultAddComponent},
    
    {path:'time-table',     component:TimeTableComponent},
    {path:'lesson-add',     component:LessonAddComponent},
    {path:'lesson-update/:id/:type',   component:LessonUpdateComponent},
    {path:'time-slot',     component:TimeSlotComponent},
    {path:'path-map', component:PathMapComponent},
    {path:'package-analysis'    ,component:PackageAnalysisComponent},

    {path:'trial-lesson-book',  component:TrialLessonBookComponent},
    {path:'trial-lesson-list/:package/:title',  component:TrialLessonListComponent},

    {path:'student-profile' ,component:StudentProfileComponent}
];
