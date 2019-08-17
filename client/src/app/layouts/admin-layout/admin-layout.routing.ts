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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {path:'staff-list',       component:StaffListComponent},
    {path:'package-list',     component:PackageListComponent},
    {path:'report-list',     component:ReportListComponent},
    {path:'vehicle-list',     component:VehicleListComponent},
    {path:'student-list',     component:StudentListComponent},
    {path:'student-add',     component:StudentAddComponent},
    {path:'student-package-add/:id',     component:StudentPackageAddComponent},
    {path:'student-payment/:id',     component:StudentPaymentComponent}
];
