import { PlansRepositoryInMemory } from "../../../../domain/repositories/in-memory/plans.repos";
import { IPlansRepository } from "../../../../domain/repositories/interfaces/plan-repository.interface";
import { IPlansService, PlanService } from "../../../services/plan-service";
import { IUseCase } from "../../interfaces/use-case-interface";
import { CreatePlanUseCase, ICreatePlanUseCase } from "./create-plan.use-case";

let sut: ICreatePlanUseCase;
let service: IPlansService;
let repository: IPlansRepository

describe("Create Plan Use Case", () => {

    beforeEach(() => {
        repository = new PlansRepositoryInMemory();
        service = new PlanService(repository);
        sut = new CreatePlanUseCase(service);
    })

    it("Should be able to create a new plan", async () => {
        const data = {
            title: "Básico",
            description: "Ideal para uma pessoa que gosta de qualidade.",
            price: 20
        };

        const plan = await sut.exec(data);

        expect(plan).toBeTruthy();
        expect(plan).toHaveProperty("id");

        delete plan.id;

        expect(plan).toEqual(data);

    })
})