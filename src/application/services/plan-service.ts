import { IPlansRepository, PlanDTO } from "../../domain/repositories/interfaces/plan-repository.interface"

interface IPlansService {
    list(): Promise<PlanDTO[]>
}

class PlanService implements IPlansService {

    constructor(private planRepository: IPlansRepository) { }

    async list(): Promise<PlanDTO[]> {
        return this.planRepository.find();
    }
}

export {
    IPlansService,
    PlanService
}