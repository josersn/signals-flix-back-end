import { UserRepositoryInMemory } from "../../../../domain/repositories/in-memory/users.repos";
import { IUserRepository } from "../../../../domain/repositories/interfaces/user-repository.interface";
import { IUserService, UserService } from "../../../services/user-service";
import { CreateUserUseCase, ICreateUserUseCase } from "./create-user.use-case";

let sut: ICreateUserUseCase;
let service: IUserService;
let repository: IUserRepository;

describe("Create User use case", () => {

    beforeEach(() => {
        repository = new UserRepositoryInMemory();
        service = new UserService(repository);
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

})