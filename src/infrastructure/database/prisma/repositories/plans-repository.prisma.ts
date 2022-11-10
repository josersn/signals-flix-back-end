import { prismaClient } from "..";
import { Plan } from "../../../../domain/entities/plan";
import { IPlansRepository, PlanDTO } from "../../../../domain/repositories/interfaces/plan-repository.interface";

class PlansRepositoryPrisma implements IPlansRepository {

    find(): Promise<Plan[]> {
        // @ts-expect-error 
        return prismaClient.plans.findMany();
    }

    async save(data: PlanDTO): Promise<Plan> {
        // @ts-expect-error 
        return prismaClient.plans.create({
            // @ts-expect-error 
            data
        })
    }

}

export { PlansRepositoryPrisma }