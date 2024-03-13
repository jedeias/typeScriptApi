import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { Auth } from '../controllers/Auth';
import { User } from '../models/user/User';


export class PostRequestHandler {
    users = new UserController();
    Auth = new Auth();

    handle = async (req: Request, res: Response) => {
        const token = req.body.token; // Supondo que o token esteja no corpo da requisição
        const isTokenValid = await this.Auth.verifyToken(token);
        if (!isTokenValid) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        try {

            const { age, name, email, password, isAdmin } = req.body;

            const createUser = new User(
                age,
                name,
                email,
                password,
                isAdmin,
            );

            const users = await this.users.createUser(createUser);
            return res.json({"status": users});
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(401).json({ message: 'Email or password not found' });
        }
    
        const authenticatedUser: User | boolean = await Auth.login(email, password);
    
        if (authenticatedUser instanceof User) {
            const token = await Auth.generateToken();
    
            if (token) {
    
                const router:any = express.Router();
                console.log('var router >_:',router)
                
                return res.status(200).json({ message: 'User authenticated', user: authenticatedUser, token: token });
    
            }
            return res.status(500).json({ message: 'token not fund'});
        } else {
            return res.status(401).json({ message: 'Authentication error or user not found' });
        }
    
    };
}