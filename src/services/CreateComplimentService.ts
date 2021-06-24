import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";



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
        
        return compliment;

    }
}

export {CreateComplimentService}