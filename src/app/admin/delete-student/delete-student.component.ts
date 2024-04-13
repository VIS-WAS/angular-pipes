import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/Model/Students';

@Component({
  selector: 'delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css'],
})
export class DeleteStudentComponent {
  @Input()
  studentToDelete: Student;
  @Output()
  deleteUserClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteConfirmation(value: boolean) {
    this.deleteUserClicked.emit(value);
  }
}
