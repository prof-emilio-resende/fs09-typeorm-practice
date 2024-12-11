import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Vehicle } from "./entity/Vehicle"

async function criarUsuario(user: User) {
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)
}

async function criarVeiculo(veiculo: Vehicle) {
    await AppDataSource.manager.save(veiculo);
    console.log("Saved a new vehicle with id: " + veiculo.id)
}

async function buscarUsuarioPeloNome(name: string) {
    console.log(`Searching user from db with name [${name}]...`)
    const usr = await AppDataSource.manager.findOneBy(User, {
        firstName: name
    });
    if(usr != null && usr.id > 0) {
        return usr;
    }

    throw Error("Usuario nao encontrado!");
}

async function listarTodosUsuarios() {
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

async function removerUsuario(user: User) {
    console.log("Deleting user from db...")
    await AppDataSource.manager.delete(User, user.id);
    console.log("user deleted: ", user)
}

async function removerUsuarioPeloNome(name: string) {
    console.log(`Deleting user from db with name [${name}]...`)
    const usr = await buscarUsuarioPeloNome(name);
    await removerUsuario(usr);
}

async function listarTodosVeiculos() {
    console.log("Loading vehicles from the database...")
    const vehicles = await AppDataSource.manager.find(Vehicle)
    console.log("Loaded vehicles: ", vehicles)
    return vehicles;
}

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await criarUsuario(user);

    const allUsers = await listarTodosUsuarios();
    
    await listarTodosVeiculos();

    const vehicle = new Vehicle();
    vehicle.description = "Porsche 911 carrera";
    vehicle.year = 2020;
    vehicle.user = await buscarUsuarioPeloNome("Timber");

    await criarVeiculo(vehicle);

    await listarTodosVeiculos();

    const allUsersWithVehicles = await listarTodosUsuarios();
    (allUsersWithVehicles).forEach(u => {
        console.log('usuario: ' + u.firstName);
        console.log('veiculos:');
        u.fleet.forEach(v => console.log(v.description));
    })

    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Cleaning all resources...")
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")

    await removerUsuarioPeloNome("Timber");
    allUsers.forEach(async u => await removerUsuario(u));

}).catch(error => console.log(error))
