import { PlanDTO } from "../../../../domain/repositories/interfaces/plan-repository.interface";
import { IPlansService } from "../../../services/plan-service";
import { IUseCase } from "../../interfaces/use-case-interface";

interface ICreatePlanRequest {
    title: string;
    description: string;
    price: number;
}

type ICreatePlanUseCase = IUseCase<ICreatePlanRequest, PlanDTO>

class CreatePlanUseCase implements ICreatePlanUseCase {

    private readonly planService: IPlansService;

    constructor(planService: IPlansService) {
        this.planService = planService;
    }

    async exec({
        title,
        description,
        price
    }: ICreatePlanRequest): Promise<PlanDTO> {
        return this.planService.create({
            description,
            price,
            title
        })
    }
}

export {
    ICreatePlanUseCase,
    CreatePlanUseCase
}