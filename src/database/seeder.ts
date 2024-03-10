import {User} from "../models/user/User";
import { UserRepository } from "./UserRepository";

const newUser: User = new User(23, "john", "john@email.com", "123456", true);

const repository = new UserRepository();

repository.createUser(newUser);

let users = repository.getAllUsers();

users.then(users => {console.log(users)});

