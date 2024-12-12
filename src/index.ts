import { AppDataSource } from "./data-source"
import { buscarUsuarioPeloNome, criarUsuario, criarVeiculo, listarTodosUsuarios, listarTodosVeiculos, removerUsuario, removerUsuarioPeloNome } from "./entity-mgr"
import { buscarUsuarioPeloNome as buscarUsuarioPeloNomeQb, listarTodosUsuarios as listarTodosUsuariosQb, listarTodosUsuariosComVeiculos } from "./query-builder";
import { User } from "./entity/User"
import { Vehicle } from "./entity/Vehicle"

async function queryBuilder() {
    console.log("buscando usuario via query builder...");
    const u = await buscarUsuarioPeloNomeQb("Timber");
    console.log(u);

    console.log("buscando todos os usuarios + veiculos via query builder...");
    const usrs = await listarTodosUsuariosQb();
    console.log(usrs);

    console.log("buscando todos os usuarios COM veiculos via query builder...");
    const usrsVeh = await listarTodosUsuariosComVeiculos();
    console.log(usrsVeh);
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

    const user2 = new User()
    user2.firstName = "Emilio"
    user2.lastName = "Resende"
    user2.age = 36
    await criarUsuario(user2);

    const allUsersWithVehicles = await listarTodosUsuarios();
    (allUsersWithVehicles).forEach(u => {
        console.log('usuario: ' + u.firstName);
        console.log('veiculos:');
        u.fleet.forEach(v => console.log(v.description));
    })

    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Using query builder...")
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    await queryBuilder();

    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Cleaning all resources...")
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")

    await removerUsuarioPeloNome("Timber");
    listarTodosUsuarios().then(u => u.forEach(async u => await removerUsuario(u)));

}).catch(error => console.log(error))
