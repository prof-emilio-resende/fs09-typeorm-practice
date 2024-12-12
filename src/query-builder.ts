import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

export async function buscarUsuarioPeloNome(name: string) {
    console.log(`Searching user from db with name [${name}]... [query-builder]`);
    const usr = await AppDataSource.createQueryBuilder(User, "user")
        .where("user.firstName = :name", { name: "Timber" })
        .getOne();

    return usr;
}

export async function listarTodosUsuarios() {
    console.log("Loading users from the database [query-builder]...")
    const users = await AppDataSource.createQueryBuilder(User, "user")
        .leftJoinAndSelect("user.fleet", "v")
        .getMany();
    
    console.log("Loaded user: ", users)
    return users;
}

export async function listarTodosUsuariosComVeiculos() {
    console.log("Loading users from the database [query-builder]...")
    const users = await AppDataSource.createQueryBuilder(User, "user")
        .innerJoinAndSelect("user.fleet", "v")
        .getMany();
    
    console.log("Loaded users: ", users)
    return users;
}