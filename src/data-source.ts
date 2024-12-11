import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { CreateUser1733956265107 } from "./migration/1733956265107-createUser"
import { Vehicle } from "./entity/Vehicle"
import { CreateVehicle1733958372933 } from "./migration/1733958372933-createVehicle"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: "all",
    entities: [User, Vehicle],
    migrations: [CreateUser1733956265107, CreateVehicle1733958372933],
    subscribers: [],
})
