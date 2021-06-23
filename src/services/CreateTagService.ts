import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService{
    //Como é apenas campo fazemos direto no execute, quase seja mais campos faça a interface, vide CreateUserService.ts
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Incorrect name!");
        }

        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });

        if(tagAlreadyExists){
            throw new Error("Tag already exists!")
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService }