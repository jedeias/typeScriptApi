import {IUser} from './IUser';

export class User implements IUser {

    private pk: number;
    private age: number;
    private name: string;
    private email: string;
    private password: string;
    private type: string;
    private idType: number;

    constructor(    
        pk: number,
        age: number,
        name: string,
        email: string,
        password: string,
        type: string,
        idType: number,


    ){
        this.pk = pk;
        this.age = age;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.idType = idType;
    }

    //getters methods

    getPk(): number {
        return this.pk;
    }

    getAge(): number {
        return this.age;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getEmail(): string {
        return this.email;
    }

    getIdType(): number {
        return this.idType;
    }

    getPassword(): string {
        return this.password;
    }

    //setters methods

    setPk(pk: number): void {
        this.pk = pk;
    }

    setAge(age: number): void {
        this.age = age;    
    }
    
    setName(name: string): void {
        this.name = name;
    }
    
    setType(type: string): void {
        this.type = type;
    }
    
    setEmail(email: string): void {
        this.email = email;
    }
    
    setIdType(idType: number): void {
        this.idType = idType;
    }
    
    setPassword(password: string): void {
        this.password = password;
    }

}