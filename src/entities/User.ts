import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer"; //https://github.com/typestack/class-transformer
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude() //Para não listar em nenhuma pesquisa -  Biblioteca do class transformer comando de instalação yarn add class-transformer
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    //Sempre quando for chama o método new User() {}
    constructor(){
        if(!this.id){
            this.id = uuid();
        }

    }

}

export { User };


/**
 * Entity (user) <-> ORM <-> BD
 *                Repositórios 
 * 
 */