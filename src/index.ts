import express, {Request, Response} from 'express';
import { Auth} from './controllers/Auth';
import { User } from './models/user/User';

const app = express();
const port: number = 3000;

app.use(express.json());

app.post ("/", (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    
    const authenticatedUser: User | boolean = Auth.login(email, password);
    

    if(email == null || password == null){
        res.status(401).json({ message: 'email or password not fund' });
    }
    // res.status(401).json({ message: `${email} and ${password}` });
    

    
    if(authenticatedUser instanceof User) {
        res.status(200).json({ message: 'Usuário autenticado', user: authenticatedUser });
    }

    if(authenticatedUser == false) {
        res.status(401).json({ message: 'Erro de autenticação ou usuário não encontrado' });
    }
    
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});