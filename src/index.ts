import express, {Request, Response} from 'express';


const app = express();
const port: number = 3000;

app.get ("/", (req: Request, res: Response) => {
    res.send('this is working...');
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});