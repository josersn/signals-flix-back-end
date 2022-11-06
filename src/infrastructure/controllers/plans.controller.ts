import { Controller, GET, POST } from 'fastify-decorators';

import { PlanService } from "../../application/services/plan-service";
import { ListPlansUseCase } from "../../application/use-cases/plans/list-plans/list-plans.use-cases";
import { CreatePlanUseCase } from "../../application/use-cases/plans/create-plan/create-plan.use-case";
import { PlansRepositoryPrisma } from "../database/prisma/repositories/plans-repository.prisma";
import { prisma } from '../database/prisma';
import { redisClient } from '../database/redis';

@Controller('/plans')
export default class PlansController {
    @GET("/")
    async getPlans(req, reply) {
        try {

            const cacheKey = "plans:getPlans";

            const plansCached = await redisClient.get(cacheKey);

            if (plansCached) {
                return reply.send(JSON.parse(plansCached))
            }

            const repository = new PlansRepositoryPrisma();
            const service = new PlanService(repository);
            const useCase = new ListPlansUseCase(service);

            const plans = await useCase.exec();

            await redisClient.set(cacheKey, JSON.stringify(plans))
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

        const plan = await useCase.exec(req.body);

        return reply.status(201).send(plan);
    }
}