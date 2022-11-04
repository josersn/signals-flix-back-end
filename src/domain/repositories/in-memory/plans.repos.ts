import { Plan } from "../../entities/plan";
import { IPlansRepository } from "../interfaces/plan-repository.interface";

class PlansRepositoryInMemory implements IPlansRepository {

    private plans: Plan[];

    constructor() { 
        this.plans = [];
    }

    async find(): Promise<Plan[]> {
        return this.plans;
    }

}

export { PlansRepositoryInMemory }