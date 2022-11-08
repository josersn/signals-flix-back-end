import { Controller, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";

@Controller("/auth")
export default class AuthController {

    @POST("/login")
    async login(req: FastifyRequest, reply: FastifyReply) {
        
    }
}

export { AuthController }