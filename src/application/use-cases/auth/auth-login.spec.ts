import { UserRepositoryInMemory } from "../../../domain/repositories/in-memory/users.repos";
import { IUserRepository } from "../../../domain/repositories/interfaces/user-repository.interface";
import { Encryption } from "../../../infrastructure/providers/encryption";
import { IEncryption } from "../../../infrastructure/providers/encryption/interface";
import { IUserService, UserService } from "../../services/user-service";
import { CreateUserUseCase, ICreateUserUseCase } from "../users/create-user/create-user.use-case";
import { AuthLoginUseCase, IAuthLoginUseCase } from "./auth-login.use-case";

let repository: IUserRepository;
let service: IUserService;
let createUserUseCase: ICreateUserUseCase;
let encryption: IEncryption;
let sut: IAuthLoginUseCase;



describe("Auth Login User case", () => {

    beforeEach(() => {
        repository = new UserRepositoryInMemory();
        encryption = new Encryption();
        service = new UserService(repository, encryption);
        createUserUseCase = new CreateUserUseCase(service);
        sut = new AuthLoginUseCase(service);
    })


    it("Should be able to have secrets to login", async () => {
        const user = {
            email: "nettorammos@hotmail.com",
            password: "mock_password"
        }

        await createUserUseCase.exec(user);
        const { token } = await sut.exec(user);


        expect(token).toBeTruthy();

    })
})