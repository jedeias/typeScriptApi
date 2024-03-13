import express,{ Request, Response } from "express";
import { Auth } from "../controllers/Auth";
import { UserController } from "../controllers/UserController";

export class DeleteRequestHandler{

    private auth = new Auth();
    private user = new UserController();

    public handle = async(req: Request, res: Response) =>{
    
        const token = req.body.token;
        const isTokenValid = this.auth.verifyToken(token);

        if (!isTokenValid) {
            return res.status(401).json({error: "token invalid"}).json
        }

        try{

            const {id} = req.body;

            const remove = await this.user.deleteUser(id);
            return res.status(200).json({success: remove});


        }catch(error){
            return res.status(500).json({"sorry we have a problem": error});
        }

    }

}