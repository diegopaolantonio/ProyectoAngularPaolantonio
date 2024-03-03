import { CourseInterface } from '../../courses/models';
import { UserInterface } from '../../users/models';

export interface InscriptionInterface {
  id: string;
  userId: string;
  courseId: string;
  user?: UserInterface;
  course?: CourseInterface;
}

export interface CreateInscriptionInterface {
  userId: string | null;
  courseId: string | null;
}

export interface UpdateInscriptionInterface {
  inscription: InscriptionInterface;
  updateString: string;
}
