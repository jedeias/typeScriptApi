import { PrismaClient } from "@prisma/client";
import {IUser} from "../user/IUser";
import { User } from "../user/User";

export class UserRepository{

    private prisma: PrismaClient;

    constructor(){

        this.prisma = new PrismaClient();
    
    }

    async createUser(user: IUser){
        try {

            const hasThisEmail = await this.prisma.user.findUnique({
                where: {email: user.getEmail()},
            });
            
            if(hasThisEmail) {
                return ({"erro": "Este e-mail já está em uso."});
            }

            const newUser = await this.prisma.user.create({
                data: {
                    age: user.getAge(),
                    email: user.getEmail(),
                    name: user.getName(),
                    password: user.getPassword(),
                    isAdmin: user.getType()
                }
            });
            return ({'Novo usuário criado:': newUser});
        } catch (error) {
            return ({'Erro ao criar usuário:': error});
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async getAllUsers() {
        try{
            const allUser = await this.prisma.user.findMany();

            return allUser;
        }catch(error){
            return ["massage: error:", error];
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

            return {"update": updateUser};

        }catch(error){
            return {"massage: error:": error};
        }finally{
            await this.prisma.$disconnect();
        }
    }

    async delete(id: number){
        try{

            const revewl = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if(!revewl){
                return({"erro":"this id not exist"});
            }

            const deleteUser = await this.prisma.user.delete({
                where:{
                    id: id,
                }
                
            });

            return {"success to remuve >_: ": deleteUser};
        }catch(error){
            return ["massage: error:", error];
        }finally{
            await this.prisma.$disconnect();
        }
    }
    
    async getByEmail(email: string): Promise<User | string>{
        try{
            const user = await this.prisma.user.findUnique({
                where:{
                    email: email,
                }
            });
    
            if(!user){
                return ('Usuário não encontrado');
            }
    
            const newUser = new User(
                user.age,
                user.name,
                user.email,
                user.password,
                user.isAdmin
            );

            return newUser;
    
        }catch(error){
            return (`Houve um erro ao tentar encontrar o email: ${error}`);
        }finally{
            await this.prisma.$disconnect();
        }
    }

}