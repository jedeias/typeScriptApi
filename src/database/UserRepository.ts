import { PrismaClient } from "@prisma/client";
import {IUser} from "../models/user/IUser";

export class UserRepository{

    private prisma: PrismaClient;

    constructor(){

        this.prisma = new PrismaClient();
    
    }

    async createUser(user: IUser) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    age: user.getAge(),
                    email: user.getEmail(),
                    name: user.getName(),
                    password: user.getPassword(),
                    isAdmin: user.getType()
                }
            });
            console.log('Novo usuário criado:', newUser);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async getAllUsers() {
        try{
            const allUser = await this.prisma.user.findMany();
            return allUser;

        }catch(error){
            console.log("massage: error: ", error);
            return [];
        }finally{
            await this.prisma.$disconnect();
        }
    }

}