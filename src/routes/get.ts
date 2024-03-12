import express, {Request, Response} from 'express';
import { UserController } from '../controllers/userController';
import { Auth } from '../controllers/Auth';


const router = express.Router();

router.get('/', (req : Request, res: Response) => {
    return res.send('test');
});

router.get('/user', Auth.verifyToken, UserController.getAllUsers);

console.log('tudo certo');