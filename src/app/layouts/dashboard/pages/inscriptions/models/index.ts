import { CourseInterface } from '../../courses/models';
import { StudentInterface } from '../../students/models';

export interface InscriptionInterface {
  id: string;
  studentId: string;
  courseId: string;
  createdUserId: string;
  createdDate: Date;
  modifiedUserId: string | null;
  modifiedDate: Date | null;
  student?: StudentInterface;
  course?: CourseInterface;
}

export interface CreateInscriptionInterface {
  studentId: string | null;
  courseId: string | null;
  createdUserId: string;
  createdDate: Date;
  modifiedUserId: string | null;
  modifiedDate: Date | null;
}

export interface UpdateInscriptionInterface {
  inscription: InscriptionInterface;
  updateString: string;
}
