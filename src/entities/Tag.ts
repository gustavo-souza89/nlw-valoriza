import { 
    Entity,
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

import { Expose } from "class-transformer"; //https://github.com/typestack/class-transformer

import { v4 as uuid } from "uuid";

@Entity("tags")
class Tag{
    @PrimaryColumn()
    readonly id: string;
    
    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: "nameCustom"}) //Personaliza a forma de listar o campo nome -   Biblioteca do class transformer comando de instalação yarn add class-transformer
    nameCustom(): string{
        return `#${this.name}`;
    }

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Tag };