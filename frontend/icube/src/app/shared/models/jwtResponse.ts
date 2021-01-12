import {Role} from "../enums/Role";

export class JwtResponse {

  token: string;
  type: string;
  email: string;
  role: string;

  public constructor() {
    this.token = 'Bearer';
    this.role = Role.USER;
  }

}
