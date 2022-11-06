import { UserRepositoryInMemory } from "../../../../domain/repositories/in-memory/users.repos";
import { IUserRepository } from "../../../../domain/repositories/interfaces/user-repository.interface";
import { Encryption } from "../../../../infrastructure/providers/encryption";
import { IEncryption } from "../../../../infrastructure/providers/encryption/interface";
import { IUserService, UserService } from "../../../services/user-service";
import { CreateUserUseCase, ICreateUserUseCase } from "./create-user.use-case";

let sut: ICreateUserUseCase;
let service: IUserService;
let repository: IUserRepository;
let encryptionProvider: IEncryption;

describe("Create User use case", () => {

    beforeEach(() => {
        repository = new UserRepositoryInMemory();
        encryptionProvider = new Encryption();
        service = new UserService(repository, encryptionProvider);
        sut = new CreateUserUseCase(service);
    })

    it("Should able to create a new User", async () => {

        const data = {
            email: "mock_user@hotmail.com",
            password: "mockPassword",
        }

        const user = await sut.exec(data);


        expect(user).toBeTruthy();
        expect(user).toHaveProperty("id");
    });

    it("Should not be able to create a user if email already exists", async () => {
        const data = {
            email: "mock_user@hotmail.com",
            password: "mockPassword",
        }

        await sut.exec(data);

        await expect(sut.exec(data)).rejects.toThrowError(Error("Email Already Exists"));
    })
})