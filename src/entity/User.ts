import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Vehicle } from "./Vehicle"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => Vehicle, (vehicle) => vehicle.user, {cascade: true})
    fleet: Array<Vehicle>
}
