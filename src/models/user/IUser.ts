export interface IUser{
    getPk(): number;
    getAge(): number;
    getName(): string;
    getType(): string;
    getEmail(): string;
    getIdType(): number;
    getPassword(): string;

    setPk(pk: number): void;
    setAge(age: number): void;
    setName(name: string): void;
    setType(type: string): void;
    setEmail(email: string): void;
    setIdType(idType: number): void;
    setPassword(password: string): void;
}