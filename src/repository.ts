import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

export const UserRepository = AppDataSource.getRepository(User).extend({
    findAllByFirstAndLastName(firstName: string, lastName: string) {
        return this.createQueryBuilder("u")
            .where("u.firstName = :firstName and u.lastName = :lastName", { firstName, lastName })
            .andWhere("1 = 1")
            .getMany();
    }
});