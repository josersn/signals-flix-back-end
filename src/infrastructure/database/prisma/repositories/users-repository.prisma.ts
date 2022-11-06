import { prisma } from "..";
import { IUserRepository, UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";

class UserRepository implements IUserRepository {
    create(data: UserDTO): Promise<UserDTO> {
        return prisma.users.create({
            data
        })
    }
    findBy(where: any): Promise<UserDTO | undefined> {
        return prisma.users.findFirst(where);
    }
}

export { UserRepository }