import { prismaClient } from "..";
import { IUserRepository, UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";

class UserRepository implements IUserRepository {
    create(data: UserDTO): Promise<UserDTO> {
        // @ts-ignore
        return prismaClient.users.create({
            // @ts-ignore
            data
        })
    }
    findBy(where: any): Promise<UserDTO | undefined> {
        // @ts-ignore
        return prismaClient.users.findFirst(where);
    }
}

export { UserRepository }