import { User } from "../../entities/user";
import { IUserRepository, UserDTO } from "../interfaces/user-repository.interface";

class UserRepositoryInMemory implements IUserRepository {

    private users: User[]

    constructor() {
        this.users = [];
    }

    async create({
        email,
        password
    }: UserDTO): Promise<UserDTO> {
        const user = new User();

        Object.assign(user, {
            id: "1",
            email,
            password
        });

        this.users.push(user)

        return user;
    }
}

export { UserRepositoryInMemory }