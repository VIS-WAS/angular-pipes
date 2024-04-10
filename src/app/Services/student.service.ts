import { Injectable } from '@angular/core';
import { Student } from '../Model/Students';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  student: Student[] = [
    new Student(1, 'Vishwas', 'Male', new Date('09-25-1998'), 'BE', 525, 2500),
    new Student(
      2,
      'Mark Vought',
      'Male',
      new Date('10-06-1998'),
      'B.Tech',
      420,
      2899
    ),
    new Student(
      3,
      'Sarah King',
      'Female',
      new Date('09-22-1996'),
      'B.Tech',
      540,
      2899
    ),
    new Student(
      4,
      'Merry Jane',
      'Female',
      new Date('06-12-1995'),
      'MBA',
      380,
      1899
    ),
    new Student(
      5,
      'Steve Smith',
      'Male',
      new Date('12-21-1999'),
      'M.Sc',
      430,
      799
    ),
    new Student(
      6,
      'Jonas Weber',
      'Male',
      new Date('06-18-1997'),
      'M.Sc',
      320,
      799
    ),
  ];

  totalMarks: number = 600;

  CreateStudent(
    name: string,
    gender: string,
    dob: Date,
    course: string,
    marks: number,
    fee: number
  ) {
    let id = this.student.length + 1;
    let student = new Student(id, name, gender, dob, course, marks, fee);
    this.student.push(student);

    //-------//to understand impure pipe//------------//

    // let studentCopy = [...this.student];
    // studentCopy.push(student);
    // this.student = studentCopy;

    //-------//to understand impure pipe//------------//
  }

  filterStudentByGender(filterBy: string) {
    if (
      filterBy.toLowerCase() === 'all' ||
      filterBy === '' ||
      this.student.length === 0
    ) {
      return this.student;
    } else {
      return this.student.filter((std) => {
        return std.gender.toLowerCase() === filterBy.toLowerCase();
      });
    }
  }
}
