import { PrismaClient } from "@prisma/client";
import {IUser} from "../user/IUser";

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

    async updateUser(user: IUser){
        try{
            const updateUser = await this.prisma.user.update({
                data:{
                    age: user.getAge(),
                    email: user.getEmail(),
                    name: user.getName(),
                    password: user.getPassword(),
                    isAdmin: user.getType(),
                },
                where:{
                    id: user.getPk()
                }
                
            });
        }catch(error){
            console.log("massage: error: ", error);
            return [];
        }finally{
            await this.prisma.$disconnect();
        }
    }

    async updateDelete(id: number){
        try{
            const deleteUser = await this.prisma.user.delete({
                where:{
                    id: id,
                }
                
            });
        }catch(error){
            console.log("massage: error: ", error);
            return [];
        }finally{
            await this.prisma.$disconnect();
        }
    }

}