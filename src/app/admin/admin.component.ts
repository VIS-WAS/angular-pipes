import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { StudentService } from '../Services/student.service';
import { Student } from '../Model/Students';
import { OnInit } from '@angular/core';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { ViewContainer } from '../Directive/viewcontainer.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  studentService: StudentService = inject(StudentService);

  students: Student[];
  totalMarks: number;

  isEditing: boolean = false;
  isInserting: boolean = false;
  stdIdToEdit: number;

  filterText: string = 'All';

  totalStudent;

  @ViewChild('name') Name: ElementRef;
  @ViewChild('gender') Gender: ElementRef;
  @ViewChild('dob') Dob: ElementRef;
  @ViewChild('course') Course: ElementRef;
  @ViewChild('marks') Marks: ElementRef;
  @ViewChild('fee') Fee: ElementRef;

  //PROPERTIES FOR EDITING
  @ViewChild('editName') editName: ElementRef;
  @ViewChild('editGender') editGender: ElementRef;
  @ViewChild('editDob') editDob: ElementRef;
  @ViewChild('editCourse') editCourse: ElementRef;
  @ViewChild('editMarks') editMarks: ElementRef;
  @ViewChild('editFee') editFee: ElementRef;

  ngOnInit() {
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalStudent = this.getCount();
    this.totalMarks = this.studentService.totalMarks;
  }

  OnFilterValuechanged(event: any) {
    this.filterText = event.target.value;
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalStudent = this.getCount();
  }
  OnInsertClicked() {
    this.isInserting = true;
  }
  OnInsertCancelled() {
    this.isInserting = false;
  }
  OnInsertSaved() {
    this.studentService.CreateStudent(
      this.Name.nativeElement.value,
      this.Gender.nativeElement.value,
      this.Dob.nativeElement.value,
      this.Course.nativeElement.value,
      this.Marks.nativeElement.value,
      this.Fee.nativeElement.value
    );
    //this.students = this.studentService.student;    // to understand impure pipe
    this.isInserting = false;
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalStudent = this.getCount();
  }

  getCount() {
    return new Promise((resolve, rejection) => {
      setTimeout(() => {
        resolve(this.students.length);
      }, 2000);
    });
  }

  OnEditClicked(stdId: number) {
    this.isEditing = true;
    this.stdIdToEdit = stdId;
  }
  OnEditCancelled() {
    this.isEditing = false;
  }

  OnEditSaved(student: Student) {
    student.name = this.editName.nativeElement.value;
    student.gender = this.editGender.nativeElement.value;
    student.dob = this.editDob.nativeElement.value;
    student.course = this.editCourse.nativeElement.value;
    student.marks = this.editMarks.nativeElement.value;
    student.fee = this.editFee.nativeElement.value;

    this.isEditing = false;
    this.students = this.studentService.filterStudentByGender(this.filterText);
  }

  //-----------//dynamic component loading using *ngIf//------------//

  // showConfirmDeleteComponent: boolean = false;

  // studentToDelete: Student;

  // deleteStudent(student: Student) {
  //   this.showConfirmDeleteComponent = true;

  //   this.studentToDelete = student;
  // }

  // userConfirmation(value: boolean) {
  //   this.showConfirmDeleteComponent = false;

  //   console.log(value);
  //   if (value) {
  //     let index = this.studentService.student.indexOf(this.studentToDelete);
  //     this.studentService.student.splice(index, 1);
  //     console.log(index);
  //   }
  // }
  //-----------//dynamic component loading using *ngIF//------------//

  //-----------//dynamic component loading programatically//------------//

  @ViewChild(ViewContainer) container: ViewContainer;

  onConfirmObs;

  constructor(
    private studentSerive: StudentService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  studentToDelete: Student;
  deleteStudent(student: Student) {
    this.studentToDelete = student;
    this.showConfirmDelete(this.studentToDelete);
  }

  showConfirmDelete(student: Student) {
    // creating an instance of confirmDelete component
    const confirmDeleteComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        DeleteStudentComponent
      );
    const containerViewRef = this.container.viewContainer;
    containerViewRef.clear();

    // rending the component in the DOM
    const componetRef = containerViewRef.createComponent(
      confirmDeleteComponentFactory
    );
    componetRef.instance.studentToDelete = student;

    this.onConfirmObs = componetRef.instance.deleteUserClicked.subscribe(
      (data) => {
        this.onConfirmObs.unsubscribe();
        containerViewRef.clear();
        if (data) {
          let index = this.studentService.student.indexOf(this.studentToDelete);
          this.studentService.student.splice(index, 1);
          console.log(index);
        }
      }
    );
  }

  //-----------//dynamic component loading programatically//------------//
}
