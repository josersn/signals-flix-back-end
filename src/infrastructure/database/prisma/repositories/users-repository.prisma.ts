import { prismaClient } from "..";
import { IUserRepository, UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";

class UserRepository implements IUserRepository {
    create(data: UserDTO): Promise<UserDTO> {
        return prismaClient.users.create({
            data
        })
    }
    findBy(where: any): Promise<UserDTO | undefined> {
        return prismaClient.users.findFirst(where);
    }
}

export { UserRepository }