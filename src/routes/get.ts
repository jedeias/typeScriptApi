import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { Auth } from '../controllers/Auth';

export class GetRequestHandler {
    users = new UserController();
    Auth = new Auth();

    handle = async (req: Request, res: Response) => {
        const token = req.body.token; // Supondo que o token esteja no corpo da requisição
        const isTokenValid = await this.Auth.verifyToken(token);
        if (!isTokenValid) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        try {
            const users = await this.users.getUsers();
            return res.json(users);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };
}