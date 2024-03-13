import { User } from "../models/user/User";
import { UserRepository } from "../models/repository/UserRepository";
import { PrismaClient } from "@prisma/client";

export class Auth {

  static async login(email: string, password: string): Promise<User | boolean> {
    try {
      const repository = new UserRepository();
      const user = await repository.getByEmail(email);

        if (typeof user === "string") {
          return false;
        }

        if (user.getEmail() === email && user.getPassword() === password) {
          
          return user;
        }

      return false;
    } catch (error) {
      
      console.error('Houve um erro no sistema:', error);
      return false;
    
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    
    const prisma = new PrismaClient();
  
    try {
    
      // consulta
      const tokenData = await prisma.token.findUnique({
        where: {
          value: token,
        },
      });
  
      if (!tokenData) {
        // não existe
        return false;
      }
  
      if (tokenData.expiresAt && new Date() > tokenData.expiresAt) {
        // já expirou
        return false;
      }
  
      return true; // não houve falha então foi um sucesso
    } catch (error) {
    
      console.log('houve um erro na validação do token: ', error);
      return false;
    
    }
  }

  static async generateToken(): Promise<string | null> {
    
    const prisma = new PrismaClient();
    try {
        const tokenValue = this.generateRandomToken(36); // Supondo que a função generateRandomToken esteja definida em outro lugar do código

        const token = await prisma.token.create({
            data: {
                value: tokenValue,
                expiresAt: new Date(Date.now() + 3600000), // Expira em 1 hora (3600000 ms)
            },
        });

        return token.value;
    } catch (error) {
    
      console.error('Houve um erro ao gerar um token:', error);
      return null;
    }finally {
        await prisma.$disconnect();
    }
  }

  static generateRandomToken(length: number): string {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }

    return token;
  }
  
}