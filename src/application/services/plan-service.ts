import { IPlansRepository, PlanDTO } from "../../domain/repositories/interfaces/plan-repository.interface"

interface IPlansService {
    list(): Promise<PlanDTO[]>
    create(data: PlanDTO): Promise<PlanDTO>
}

class PlanService implements IPlansService {

    constructor(private planRepository: IPlansRepository) { }

    async create(data: PlanDTO): Promise<PlanDTO> {
        return this.planRepository.save(data);
    }

    async list(): Promise<PlanDTO[]> {
        return this.planRepository.find();
    }
}

export {
    IPlansService,
    PlanService
}