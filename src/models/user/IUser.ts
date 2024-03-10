export interface IUser{
    getPk(): number | undefined;
    getAge(): number;
    getName(): string;
    getEmail(): string;
    getType(): boolean;
    getPassword(): string;

    setPk(pk: number): void;
    setAge(age: number): void;
    setName(name: string): void;
    setEmail(email: string): void;
    setType(type: boolean): void;
    setPassword(password: string): void;
}