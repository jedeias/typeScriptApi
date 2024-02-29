import express, {Request, Response} from 'express';
import { Auth} from './controllers/Auth';
import { User } from './models/user/User';

const app = express();
const port: number = 3000;

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ message: 'Email or password not found' });
    }

    const authenticatedUser: User | boolean = await Auth.login(email, password);

    if (authenticatedUser instanceof User) {
        return res.status(200).json({ message: 'User authenticated', user: authenticatedUser });
    } else {
        return res.status(401).json({ message: 'Authentication error or user not found' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});