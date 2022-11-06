import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";
import { IEncryption } from "../../infrastructure/providers/encryption/interface";

interface IUserService {
    create(data: UserDTO): Promise<UserDTO>
    findByEmail(email: string): Promise<UserDTO | undefined>
}

class UserService implements IUserService {

    private readonly userRepository: IUserRepository;
    private readonly encryptionProvider: IEncryption;

    constructor(userRepository, encryptionProvider) {
        this.userRepository = userRepository;
        this.encryptionProvider = encryptionProvider
    }

    async create(data: UserDTO): Promise<UserDTO> {

        data.password = await this.encryptionProvider.crypt(data.password);

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