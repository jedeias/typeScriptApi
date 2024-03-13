import express, {Request, Response} from 'express';
import { Routes } from './routes/routes';


const app = express();
const port: number = 3000;

const routes = new Routes(app);

app.use(express.json());

routes.initRoutes();


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});