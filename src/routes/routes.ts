import express, { Express } from 'express';
import { GetRequestHandler } from './get';
import { PostRequestHandler } from './post';
import { PutRequestHandler } from './put';
import { DeleteRequestHandler } from './delete';

export class Routes {
    private app: Express;

    constructor(app: Express) {
        this.app = app;
    }

    public initRoutes() {
        this.app.get('/user', new GetRequestHandler().handle);
        this.app.post('/user', new PostRequestHandler().handle);
        this.app.put('/user', new PutRequestHandler().handle);
        this.app.delete('/user', new DeleteRequestHandler().handle);
    }
}