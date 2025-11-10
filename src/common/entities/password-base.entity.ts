import { BeforeInsert, Column } from "typeorm";

export class PasswordBase{
    @Column("text")
        password:string
        
    @BeforeInsert()
    async hashPassword(){
        this.password = ""
    }

    async comparePassword(plainPassword:string){
        return true
    }
}