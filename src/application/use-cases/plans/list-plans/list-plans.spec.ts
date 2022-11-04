import { PlansRepositoryInMemory } from "../../../../domain/repositories/in-memory/plans.repos";
import { IPlansRepository } from "../../../../domain/repositories/interfaces/plan-repository.interface";
import { IPlansService, PlanService } from "../../../services/plan-service";
import { IListPlansUseCase, ListPlansUseCase } from "./list-plans.use-cases";

let sut: IListPlansUseCase;
let service: IPlansService;
let repository: IPlansRepository;

describe("List plans use case", () => {

    beforeEach(() => {
        repository = new PlansRepositoryInMemory();
        service = new PlanService(repository);
        sut = new ListPlansUseCase(service);
    })

    it("Should be able to list all plans", async () => {
        const plans = await sut.exec();
        expect(plans).toBeTruthy();
    })
})