export interface CourseInterface {
  id: string;
  code: string;
  name: string;
  hours: number;
  classes: number;
  teacher: string;
  startDate: Date;
  finishDate: Date;
  price: number;
}
