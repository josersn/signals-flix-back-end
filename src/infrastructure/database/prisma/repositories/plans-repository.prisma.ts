import { prismaClient } from "..";
import { Plan } from "../../../../domain/entities/plan";
import { IPlansRepository, PlanDTO } from "../../../../domain/repositories/interfaces/plan-repository.interface";

class PlansRepositoryPrisma implements IPlansRepository {

    find(): Promise<Plan[]> {
        return prismaClient.plans.findMany();
    }

    async save(data: PlanDTO): Promise<Plan> {
        return prismaClient.plans.create({
            data
        })
    }

}

export { PlansRepositoryPrisma }