import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../classes/ErrorHandler";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService{
    //Como é apenas campo fazemos direto no execute, quase seja mais campos faça a interface, vide CreateUserService.ts
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        //Tag não preenchida        
        if (!name) {
            const err = {
                name: "TagNameError",
                statusCode: 417,
                message: "Incorret Name",
                description: "Mission tag name, Please provide a name"
            }

            throw new ErrorHandler(err);

        }
        //Tag em branco
        if (name === " ") {
            const err = {
                name: "TagNameError",
                statusCode: 417,
                message: "Empty Field",
                description: "Empty Field! This field cannot be empty"
            }

            throw new ErrorHandler(err);
        }

        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });
        //Tag Existente
        if (tagAlreadyExists) {
            const err = {
                name: "tagAlreadyExists",
                statusCode: 418,
                message: "Tag Exists!",
                description: "Tag Exists! Please enter a different tag name"

            }

            throw new ErrorHandler(err)

        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
        
    }
}

export { CreateTagService }