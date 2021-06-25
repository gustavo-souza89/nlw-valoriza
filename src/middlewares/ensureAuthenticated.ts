import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}
export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction){
        //Receber o token
        const Authtoken = request.headers.authorization;

        //Validar se o token está preenchido        
        if(!Authtoken){
            response.status(401).end();
        }

        const token = Authtoken.split(' ')[1];
        
        try{
            //Validar se o token é valido
            const { sub } = verify(token, "d616c887875d53a599532d8e59b3c921") as IPayload;

            //Recuperar informações do usuário
            request.user_id = sub;


            return next();    
        }catch(err){
            response.status(401).end();
        }

        

          

    }