import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserService{

    async execute({ name, email, admin }: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);
        //Verifica se o e-mail está preenchido, caso o contrario devolve o erro.
        if(!email){
            throw new Error("Email incorrect");
        }
        //Consulta no BD se User já existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        // Se o usuário esiver cadastrado informa que o usuário já está cadastrado
        if (userAlreadyExists){
            throw new Error ("User already exists");
        }
        //Cria o registro no BD
        const user = usersRepository.create({
            name,
            email,
            admin
        });
        //Salva a o registro no BD
        await usersRepository.save(user);
        // Retorna para os dados cadastrados
        return user;
    }
}

export {CreateUserService}