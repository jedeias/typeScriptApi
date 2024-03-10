import {IUser} from './IUser';

export class User implements IUser {

    private pk?: number;
    private age: number;
    private name: string;
    private email: string;
    private password: string;
    private type: boolean;
    

    constructor(    
        age: number,
        name: string,
        email: string,
        password: string,
        idType: boolean,


    ){
        this.age = age;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = idType;
    }

    //getters methods

    getPk(): number | undefined {
        return this.pk;
    }

    getAge(): number {
        return this.age;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getType(): boolean {
        return this.type;
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
    
    setType(type: boolean): void {
        this.type = type;
    }
    
    setEmail(email: string): void {
        this.email = email;
    }
    
    setPassword(password: string): void {
        this.password = password;
    }

}