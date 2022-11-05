import { PlanService } from "../../application/services/plan-service";
import { ListPlansUseCase } from "../../application/use-cases/plans/list-plans/list-plans.use-cases";
import { PlansRepositoryInMemory } from "../../domain/repositories/in-memory/plans.repos";
import { Controller, GET } from 'fastify-decorators';

@Controller('/plans')
export default class PlansController {
    @GET("/")
    async getPlans() {
        const repository = new PlansRepositoryInMemory();
        const service = new PlanService(repository);
        const useCase = new ListPlansUseCase(service);

        return useCase.exec();
    }
}