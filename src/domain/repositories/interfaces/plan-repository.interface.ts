import { Plan } from "../../entities/plan";

interface IPlansRepository {
    find(): Promise<Plan[]>
}

interface PlanDTO {
    id?: string;
    title: string;
    description: string;
    price: string;
}

export {
    IPlansRepository,
    PlanDTO
}