import { UserRepository } from "../models/repository/UserRepository";
import { IUser } from "../models/user/IUser";

export class UserController {
    private static repository: UserRepository;

    constructor() {
        UserController.repository = new UserRepository();
    }

    public getUsers() {
        return UserController.repository.getAllUsers();
    }

    public createUser(user : IUser) {
        return UserController.repository.createUser(user);
    }

    public updateUser(user : IUser){
        return UserController.repository.updateUser(user);
    
    }
    
    public deleteUser(id: number){
        return UserController.repository.delete(id);
    }
}

// let test = new UserController();

// // console.log(test.deleteUser(1));

// console.log(test.getUsers().then(users => {
//     console.log(users);
// }));

