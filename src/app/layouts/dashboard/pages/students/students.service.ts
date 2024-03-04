import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStudentInterface, StudentInterface } from './models';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}

  getStudents() {
    return this.httpClient.get<StudentInterface[]>(
      `${environment.apiURL}/students`
    );
  }

  getStudentsById(studentId: string) {
    return this.httpClient.get<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`
    );
  }

  postStudent(student: CreateStudentInterface) {
    return this.httpClient.post<StudentInterface>(
      `${environment.apiURL}/students`,
      student
    );
  }

  deleteStudentById(studentId: string) {
    return this.httpClient.delete<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`
    );
  }

  putStudentById(studentId: string, student: StudentInterface) {
    return this.httpClient.put<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`,
      student
    );
  }
}
