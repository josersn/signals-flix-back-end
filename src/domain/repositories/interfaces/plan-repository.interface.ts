import { Plan } from "../../entities/plan";

interface IPlansRepository {
    find(): Promise<Plan[]>
    save(data: PlanDTO): Promise<Plan>
}

interface PlanDTO {
    id?: BigInt;
    title: string;
    description: string;
    price: number;
}

export {
    IPlansRepository,
    PlanDTO
}