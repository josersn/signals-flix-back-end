import { Controller, POST } from "fastify-decorators";
import { UserService } from "../../application/services/user-service";
import { CreateUserUseCase } from "../../application/use-cases/users/create-user/create-user.use-case";
import { UserRepository } from "../database/prisma/repositories/users-repository.prisma";
import { Encryption } from "../providers/encryption";
import { Tokenization } from "../providers/tokenization";

@Controller("users")
export default class UserController {

    @POST("/")
    async createUser(req, reply) {
        try {
            const repository = new UserRepository();
            const encryptionProvider = new Encryption();
            const tokenizationProvider = new Tokenization(String(process.env.SECRET), Number(process.env.expiresIn));
            const service = new UserService(repository, encryptionProvider, tokenizationProvider);
            const useCase = new CreateUserUseCase(service);

            const user = await useCase.exec(req.body);

            // @ts-expect-error 
            delete user.password

            reply.status(201).send({
                message: "User Created",
                data: user
            })
        } catch (error: any) {
            return reply.status(error.code).send({
                error: true,
                message: error.message
            })
        }
    }
}
