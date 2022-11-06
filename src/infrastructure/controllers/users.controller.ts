import { Controller, POST } from "fastify-decorators";
import { UserService } from "../../application/services/user-service";
import { CreateUserUseCase } from "../../application/use-cases/users/create-user/create-user.use-case";
import { UserRepository } from "../database/prisma/repositories/users-repository.prisma";

@Controller("users")
export default class UserController {

    @POST("/")
    async createUser(req, reply) {
        try {
            const repository = new UserRepository();
            const service = new UserService(repository);
            const useCase = new CreateUserUseCase(service);

            const user = await useCase.exec(req.body);

            reply.status(201).send({
                message: "User Created",
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
}
