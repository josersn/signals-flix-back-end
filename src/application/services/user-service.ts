import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";
import { IEncryption } from "../../infrastructure/providers/encryption/interface";

interface IUserService {
    create(data: UserDTO): Promise<UserDTO>
    findByEmail(email: string): Promise<UserDTO | undefined>
    comparePassword(password: string, hash): Promise<Boolean>
    generateToken(payload: any): Promise<any>
}

class UserService implements IUserService {

    private readonly userRepository: IUserRepository;
    private readonly encryptionProvider: IEncryption;
    private readonly tokenizationProvider: ITokenization;

    constructor(userRepository: IUserRepository, encryptionProvider: IEncryption, tokenizationProvider: ITokenization) {
        this.userRepository = userRepository;
        this.encryptionProvider = encryptionProvider;
        this.tokenizationProvider = tokenizationProvider;
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

    async comparePassword(password: string, hash: string): Promise<Boolean> {
        return this.encryptionProvider.decrypt(password, hash);
    }

    async generateToken(payload: any): Promise<any> {
        return this.tokenizationProvider.sign(payload)
    }
}

export {
    IUserService,
    UserService
}