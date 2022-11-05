import { Plan } from "../../entities/plan";
import { IPlansRepository, PlanDTO } from "../interfaces/plan-repository.interface";

class PlansRepositoryInMemory implements IPlansRepository {

    private plans: Plan[];

    constructor() {
        this.plans = [];
    }

    async find(): Promise<Plan[]> {
        return this.plans;
    }

    async save({
        description,
        price,
        title
    }: PlanDTO): Promise<Plan> {
        const plan = new Plan();

        Object.assign(plan, {
            description,
            price,
            title,
            id: Math.floor(Math.random() * 2)
        })

        this.plans.push(plan);

        return plan;
    }

}

export { PlansRepositoryInMemory }