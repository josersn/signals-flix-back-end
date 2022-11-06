import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";

interface IUserService {
    create(data: UserDTO): Promise<UserDTO>
    findByEmail(email: string): Promise<UserDTO | undefined>
}

class UserService implements IUserService {

    private readonly userRepository: IUserRepository;

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async create(data: UserDTO): Promise<UserDTO> {
        return this.userRepository.create(data);
    }

    async findByEmail(email: string): Promise<UserDTO | undefined> {
        return this.userRepository.findBy({
            where: {
                email
            }
        });
    }
}

export {
    IUserService,
    UserService
}