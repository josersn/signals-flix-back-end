import { Controller, POST } from "fastify-decorators";
import { FastifyReply } from "fastify";
import { IUserRepository } from "../../domain/repositories/interfaces/user-repository.interface";
import { IEncryption } from "../providers/encryption/interface";
import { IUserService, UserService } from "../../application/services/user-service";
import { UserRepository } from "../database/prisma/repositories/users-repository.prisma";
import { Encryption } from "../providers/encryption";
import { Tokenization } from "../providers/tokenization";
import { AuthLoginUseCase } from "../../application/use-cases/auth/auth-login.use-case";
import { ITokenization } from "../providers/tokenization/interface";

@Controller("/auth")
export default class AuthController {

    private readonly repository: IUserRepository;
    private readonly encryptionProvider: IEncryption;
    private readonly tokenizationProvider: ITokenization;
    private readonly service: IUserService;

    constructor() {
        this.repository = new UserRepository();
        this.encryptionProvider = new Encryption();
        this.tokenizationProvider = new Tokenization(String(process.env.SECRET), Number(process.env.expiresIn));
        this.service = new UserService(this.repository, this.encryptionProvider, this.tokenizationProvider);
    }

    @POST("/login")
    async login(req, reply: FastifyReply) {
        try {
            const useCase = new AuthLoginUseCase(this.service);

            const token = await useCase.exec(req.body);

            reply.status(201).send(token)

        } catch (error: any) {
            return reply.status(error.code).send({
                error: true,
                message: error.message
            })
        }
    }
}

export { AuthController }