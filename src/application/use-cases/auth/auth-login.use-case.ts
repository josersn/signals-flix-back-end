import { IUserService } from "../../services/user-service";
import { IUseCase } from "../interfaces/use-case-interface";

interface IAuthRequest {
    email: string;
    password: string;
}

interface IAuthResponse {
    token: string;
}

type IAuthLoginUseCase = IUseCase<IAuthRequest, IAuthResponse>

class AuthLoginUseCase implements IAuthLoginUseCase {

    private readonly userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async exec(payload: IAuthRequest): Promise<IAuthResponse> {
        const user = await this.userService.findByEmail(payload.email);

        return {
            token: String(Math.random())
        }

    }
}

export { AuthLoginUseCase, IAuthLoginUseCase }