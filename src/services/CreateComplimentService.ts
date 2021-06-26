import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";
import nodemailer from 'nodemailer';
import { TagsRepositories } from "../repositories/TagsRepositories";



interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({ 
        tag_id, 
        user_sender, 
        user_receiver, 
        message 
    }: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(
            ComplimentsRepositories
            );
        const usersRepositories = getCustomRepository(UsersRepositories);
            
        if(user_sender === user_receiver){
            const err = {
                name: "IncorrectUserReceiver!",
                statusCode: 403,
                message: "Incorrect User Receiver!",
                description: "Use other User_Receiver!"
            }
            throw new ErrorHandler(err) 
        }
        
        const userReceiverExists = await usersRepositories.findOne(user_receiver);
        
        if(!userReceiverExists){
           const err = {
                name: "User_Receiver does not exists!",
                statusCode: 403,
                message: "User Receiver does not exists!",
                description: "User Receiver does not exists!"
            }
            throw new ErrorHandler(err) 
        }  
        
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message,
        });
        
        await complimentsRepositories.save(compliment);

        //envia e-mail para o cliente
        //método para enviar e e-mail utilizando https://mailtrap.io/ + nodemailer
         const sendNodeMailer = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                    auth: {
                        user: "a8d655a48f27e7",
                        pass: "2fc3414529b8d9"
                    }
            })
            const tagRepositories = getCustomRepository(TagsRepositories);
            const tag = await tagRepositories.findOne(tag_id);
            sendNodeMailer.sendMail({
                from: 'Webmaster <9938cbcb7c-86554d@inbox.mailtrap.io> ',
                to: userReceiverExists.email,
                subject: 'Você recebeu um Elogio!',
                html: `<p> Sua nova tag <b>${tag.name}<b/> veio com uma bela mensagem <b>${compliment.message}<b/> `                
            }).then(
                () => {
                    console.log('E-mail Enviado')
                }
            ).catch(
                () => {
                    console.log("Email Não Enviado")
                }
            )        
        return compliment;

    }
}

export {CreateComplimentService}