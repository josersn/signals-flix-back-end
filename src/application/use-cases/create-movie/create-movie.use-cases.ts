import { IUseCase } from "../interfaces/use-case-interface";

export interface movieRequest {
    title: string;
    describe: string;
    image: string;
}

export type ICreateMovieUseCase = IUseCase<movieRequest, any>

class CreateMovieUseCase implements ICreateMovieUseCase {

    async exec({
        describe,
        image,
        title
    }: movieRequest): Promise<any> {
        return {
            id: 1,
            describe,
            image,
            title
        }
    }
}

export { CreateMovieUseCase }