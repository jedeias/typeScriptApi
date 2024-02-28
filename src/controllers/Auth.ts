import { User } from '../models/user/User';
import fs from 'fs';

interface UserType {
  pkType: number;
  userType: string;
}

interface UserData {
  pkUser: number;
  name: string;
  age: number;
  email: string;
  password: string;
  typeUser: UserType;
}

export class Auth {

  static login(email: string, password: string): User | boolean {
    try {
      const data: UserData[] = [{
        "pkUser": 1,
        "name": "test1",
        "age": 22,
        "email": "test1@test.com",
        "password": "test1",
        "typeUser": {
          "pkType": 1,
          "userType": "admin"
        }
      }];

      let authenticatedUser: User | boolean = false;

      data.forEach((userData: UserData) => {
        if (userData.email === email && userData.password === password) {
          authenticatedUser = new User(
            userData.pkUser,
            userData.age,
            userData.name,
            userData.email,
            userData.password,
            userData.typeUser.userType,
            userData.typeUser.pkType
          );
        }
      });
      return authenticatedUser;
      
    } catch (error) {
      console.error('has a error in the sistem: ', error);
      return false;
    }
  }
}

