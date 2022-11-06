import { UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";
import ApiError from "../../../core/ApiError";
import { IUserService } from "../../../services/user-service";
import { IUseCase } from "../../interfaces/use-case-interface";

interface IUserRequest {
    email: string,
    password: string
}


type ICreateUserUseCase = IUseCase<IUserRequest, UserDTO>

class CreateUserUseCase implements ICreateUserUseCase {

    private readonly userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async exec(payload: IUserRequest): Promise<UserDTO> {

        const userAlreadyExists = await this.userService.findByEmail(payload.email);

        if (userAlreadyExists) {
            throw new ApiError(403, 403, "Email Already Exists");
        }

        return this.userService.create(payload)
    }

}

export {
    CreateUserUseCase,
    ICreateUserUseCase
}