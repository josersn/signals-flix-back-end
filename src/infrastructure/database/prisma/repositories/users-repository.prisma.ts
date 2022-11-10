import { prismaClient } from "..";
import { IUserRepository, UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";

class UserRepository implements IUserRepository {
    create(data: UserDTO): Promise<UserDTO> {
        // @ts-expect-error 
        return prismaClient.users.create({
            // @ts-expect-error 
            data
        })
    }
    findBy(where: any): Promise<UserDTO | undefined> {
        // @ts-expect-error 
        return prismaClient.users.findFirst(where);
    }
}

export { UserRepository }