import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import {classToPlain} from "class-transformer";


class ListTagsService{
    async execute() {
        const tagRespositories = getCustomRepository(TagsRepositories);

        const tags = await tagRespositories.find();

        return classToPlain(tags);
    }
}

export {ListTagsService}