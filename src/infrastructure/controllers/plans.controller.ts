import { Controller, GET, POST } from 'fastify-decorators';

import { PlanService } from "../../application/services/plan-service";
import { ListPlansUseCase } from "../../application/use-cases/plans/list-plans/list-plans.use-cases";
import { CreatePlanUseCase } from "../../application/use-cases/plans/create-plan/create-plan.use-case";
import { PlansRepositoryPrisma } from "../database/prisma/repositories/plans-repository.prisma";
import { prisma } from '../database/prisma';

@Controller('/plans')
export default class PlansController {
    @GET("/")
    async getPlans(req, reply) {
        try {
            const repository = new PlansRepositoryPrisma();
            const service = new PlanService(repository);
            const useCase = new ListPlansUseCase(service);

            const plans = await useCase.exec();

            return reply.send(plans)
            
        } catch (error) {
            return reply.status(500).send({
                oK: error
            })
        }
    }

    @POST("/")
    async createPlan(req, reply) {
        const repository = new PlansRepositoryPrisma();
        const service = new PlanService(repository);
        const useCase = new CreatePlanUseCase(service);

        return useCase.exec(req.body);
    }
}