import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Vehicle } from "./entity/Vehicle";

export async function criarUsuario(user: User) {
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)
}

export async function criarVeiculo(veiculo: Vehicle) {
    await AppDataSource.manager.save(veiculo);
    console.log("Saved a new vehicle with id: " + veiculo.id)
}

export async function buscarUsuarioPeloNome(name: string) {
    console.log(`Searching user from db with name [${name}]...`)
    const usr = await AppDataSource.manager.findOneBy(User, {
        firstName: name
    });
    if(usr != null && usr.id > 0) {
        return usr;
    }

    throw Error("Usuario nao encontrado!");
}

export async function listarTodosUsuarios() {
    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User, {
        relations: {
            fleet: true
        },
        relationLoadStrategy: "query"
    })
    console.log("Loaded users: ", users)
    return users;
}

export async function removerUsuario(user: User) {
    console.log("Deleting user from db...")
    await AppDataSource.manager.delete(User, user.id);
    console.log("user deleted: ", user)
}

export async function removerUsuarioPeloNome(name: string) {
    console.log(`Deleting user from db with name [${name}]...`)
    const usr = await buscarUsuarioPeloNome(name);
    await removerUsuario(usr);
}

export async function listarTodosVeiculos() {
    console.log("Loading vehicles from the database...")
    const vehicles = await AppDataSource.manager.find(Vehicle)
    console.log("Loaded vehicles: ", vehicles)
    return vehicles;
}