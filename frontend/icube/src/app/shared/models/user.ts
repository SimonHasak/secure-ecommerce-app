import {Role} from "../enums/Role";

export class User {

  id: number;
  email: string;
  password: string;
  role: string = Role.USER;

  constructor() {
    this.role = Role.USER;
  }
}
