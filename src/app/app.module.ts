import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PercentagePipe } from './Pipes/percentage.pipe';
import { FormsModule } from '@angular/forms';
import { StudentFilterPipe } from './Pipes/studentfilter.pipe';
import { DeleteStudentComponent } from './admin/delete-student/delete-student.component';
import { ViewContainer } from './Directive/viewcontainer.directive';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PercentagePipe,
    StudentFilterPipe,
    DeleteStudentComponent,
    ViewContainer,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
