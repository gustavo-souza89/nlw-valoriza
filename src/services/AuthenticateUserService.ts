import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ErrorHandler } from "../classes/ErrorHandler";
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IAuthenticateUserService{
    email: string;
    password: string;
}
//https://www.md5hashgenerator.com/ => MD5 Hash
const hashMd5 = "d616c887875d53a599532d8e59b3c921"

class AuthenticateUserService{
    async execute({ email, password }){
        const userRepositories = getCustomRepository(UsersRepositories);

        //verificar se o email existe
        const user = await userRepositories.findOne({
            email
        });
        
        if(!user){
             const err = {
                name: "Email/Password incorrect",
                statusCode: 403,
                message: "Email/Password incorrect",
                description: "Email/Password incorrect"
            }
            throw new ErrorHandler(err)
        }
        //verificar se a senha está correta
        const passwordMatch =  await compare(password, user.password);
        if(!passwordMatch){
            const err = {
                name: "Email/Password incorrect",
                statusCode: 403,
                message: "Email/Password incorrect",
                description: "Email/Password incorrect"
            }
            throw new ErrorHandler(err)            
        }
        //gerar token
        const token = sign({
            email: user.email
        }, hashMd5, {
            subject: user.id,
            expiresIn: "1d"
        });
        
        return token;
    }
}

export {AuthenticateUserService}
