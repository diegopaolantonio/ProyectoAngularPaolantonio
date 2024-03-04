export interface StudentInterface {
  id: string;
  name: string;
  profile: string;
  gender: string;
}

export interface CreateStudentInterface {
  name: string;
  profile: string;
  gender: string;
}

export interface updateStudentInterface {
  student: StudentInterface;
  updateString: string;
}
