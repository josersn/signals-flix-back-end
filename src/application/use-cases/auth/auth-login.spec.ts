import { UserRepositoryInMemory } from "../../../domain/repositories/in-memory/users.repos";
import { IUserRepository } from "../../../domain/repositories/interfaces/user-repository.interface";
import { Encryption } from "../../../infrastructure/providers/encryption";
import { IEncryption } from "../../../infrastructure/providers/encryption/interface";
import { Tokenization } from "../../../infrastructure/providers/tokenization";
import { IUserService, UserService } from "../../services/user-service";
import { CreateUserUseCase, ICreateUserUseCase } from "../users/create-user/create-user.use-case";
import { AuthLoginUseCase, IAuthLoginUseCase } from "./auth-login.use-case";

let repository: IUserRepository;
let service: IUserService;
let createUserUseCase: ICreateUserUseCase;
let encryptionProvider: IEncryption;
let tokenizationProvider: ITokenization;
let sut: IAuthLoginUseCase;

const mock_secret = "MOCK_SECRET";
const mock_expiresIn = "300";

describe("Auth Login User case", () => {

    beforeEach(() => {
        repository = new UserRepositoryInMemory();
        encryptionProvider = new Encryption();
        tokenizationProvider = new Tokenization(String(mock_secret), Number(mock_expiresIn));
        service = new UserService(repository, encryptionProvider, tokenizationProvider);
        createUserUseCase = new CreateUserUseCase(service);
        sut = new AuthLoginUseCase(service);
    })


    it("Should be able to have secrets to login", async () => {
        const data = {
            email: "nettorammos@hotmail.com",
            password: "mock_password"
        }

        await createUserUseCase.exec(data);

        data.password = "mock_password"

        const { token } = await sut.exec(data);


        expect(token).toBeTruthy();

    })

    it("Should return error if user not exists", async () => {

        const user = {
            email: "nettorammos@hotmail.com",
            password: "mock_password"
        }

        await expect(sut.exec(user)).rejects.toThrowError(Error("User not found"));
    })

    it("Should return error if provide wrong password", async () => {
        const user = {
            email: "nettorammos@hotmail.com",
            password: "mock_password"
        }

        await createUserUseCase.exec(user);

        user.password = "wrong_password"

        await expect(sut.exec(user)).rejects.toThrowError(Error("User not found"));
    })
})