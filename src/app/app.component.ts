import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Faculty } from './faculty';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students: Student[]=[];
  public faculties: Faculty[] = [];
  public editStudent:Student= new Student();
  public deleteStudent:Student=new Student();;

  
  constructor(private studentService: StudentService,private facultyService: FacultyService) {
    
    
    

  }

  ngOnInit() {
    this.facultyService.getFaculties().subscribe((faculties) => {
      this.faculties = faculties;
    });
    this.getStudents();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form')?.click();
    const newStudent = {
      ...addForm.value,
      faculty: this.faculties.find(faculty => faculty.name === addForm.value.faculty) || null
    };
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents(); 
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateStudent(): void {
    if (this.editStudent) {
      console.log("student === ", this.editStudent);
      // this.editStudent.faculty = this.faculties.find(faculty => faculty.name === this.editStudent.faculty?.name) || null;
      this.studentService.updateStudents(this.editStudent).subscribe(
        (response: Student) => {
          console.log(response);
          this.getStudents();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public onDeleteStudent(studentId: Number): void {
   
      this.studentService.deleteStudents(studentId).subscribe(
        (response: void) => {
          console.log(response);
          this.getStudents();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onOpenModal(student?: Student , mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      this.editStudent = { id: 0, name: '', studentLevel: 1,facultyId: null };
      button.setAttribute('data-target', '#addStudentModal');
    } else if (mode === 'edit' && student) {
      this.editStudent=student;
      console.log("student === ", this.editStudent);
      button.setAttribute('data-target', '#updateStudentModal');
    } else if (mode === 'delete' && student ){
      this.deleteStudent=student;
      
      button.setAttribute('data-target', '#deleteStudentModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public searchStudents(key: string): void {
    console.log(key);
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(student);
      }
    }
    this.students = results;
    if (results.length === 0 || !key) {
      this.getStudents();
    }
  }
}