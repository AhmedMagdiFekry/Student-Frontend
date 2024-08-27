import { Faculty } from "./faculty";

export class Student{
    id!:Number;
    name?:string;
    studentLevel?:number;
    facultyId?: Faculty |null;
}