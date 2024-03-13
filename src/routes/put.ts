import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { Auth } from '../controllers/Auth';
import { User } from '../models/user/User';


export class PutRequestHandler {
    users = new UserController();
    Auth = new Auth();

    handle = async (req: Request, res: Response) => {
        const token = req.body.token; // Supondo que o token esteja no corpo da requisição
        const isTokenValid = await this.Auth.verifyToken(token);
        if (!isTokenValid) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        try {

            const {id, age, name, email, password, isAdmin } = req.body;

            const user = new User(
                age,
                name,
                email,
                password,
                isAdmin,
            );

            user.setPk(id);

            const users = await this.users.updateUser(user);
            return res.json({"status": users});
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor'});
        }
    };
}