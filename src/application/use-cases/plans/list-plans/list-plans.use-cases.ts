import { PlanDTO } from "../../../../domain/repositories/interfaces/plan-repository.interface";
import { IPlansService } from "../../../services/plan-service";
import { IUseCase } from "../../interfaces/use-case-interface";

type IListPlansUseCase = IUseCase<void, PlanDTO[]>

class ListPlansUseCase implements IListPlansUseCase {

    constructor(private planService: IPlansService) { }

    async exec(): Promise<PlanDTO[]> {
        return this.planService.list();
    }

}

export {
    ListPlansUseCase,
    IListPlansUseCase
}