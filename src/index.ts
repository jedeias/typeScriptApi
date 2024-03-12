import express, {Request, Response} from 'express';
import { Auth} from './controllers/Auth';
import { User } from './models/user/User';
import { UserRepository } from './models/repository/UserRepository';

const app = express();
const port: number = 3000;

app.use(express.json());

app.post("/login", async (req: Request, res: Response) => {
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
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});