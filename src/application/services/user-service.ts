import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";

interface IUserService {
    create(data: UserDTO): Promise<UserDTO>
}

class UserService implements IUserService {

    private readonly userRepository: IUserRepository;

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    create(data: UserDTO): Promise<UserDTO> {
        return this.userRepository.create(data);
    }
}

export {
    IUserService,
    UserService
}