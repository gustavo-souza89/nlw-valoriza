import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{

    async execute({ name, email, admin = false, password }: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);
        //Verifica se o e-mail está preenchido, caso o contrario devolve o erro.
        if(!email){
            const err = {
                name: "EmailIncorrect",
                statusCode: 409,
                message: "Incorret Email",
                description: "Email Incorrect, Please check email"
            }

            throw new ErrorHandler(err);
        }
        //Tag em branco
        if (email === " ") {
            const err = {
                name: "EmailNameError",
                statusCode: 417,
                message: "Empty Field",
                description: "Empty Field! This field cannot be empty"
            }

            throw new ErrorHandler(err);
        }
        //Consulta no BD se User já existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        // Se o usuário esiver cadastrado informa que o usuário já está cadastrado
        if (userAlreadyExists){
           //throw new Error("User already exists");
            const err = {
                name: "EmailAlreadyExists",
                statusCode: 409,
                message: "User already exists",
                description: "Email exist, Please provide a new email"
            }
            throw new ErrorHandler(err)
        }
        //Criptografando o campo password
        const passwordHash = await hash(password, 8)

        //Cria o registro no BD
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });      

        //Salva a o registro no BD
        await usersRepository.save(user);
        // Retorna para os dados cadastrados
        return user;
    }
}

export {CreateUserService}