import { CourseInterface } from '../../courses/models';
import { StudentInterface } from '../../students/models';

export interface InscriptionInterface {
  id: string;
  studentId: string;
  courseId: string;
  student?: StudentInterface;
  course?: CourseInterface;
}

export interface CreateInscriptionInterface {
  studentId: string | null;
  courseId: string | null;
}

export interface UpdateInscriptionInterface {
  inscription: InscriptionInterface;
  updateString: string;
}
