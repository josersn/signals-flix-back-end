import { MovieDTO } from "../../../../domain/repositories/interfaces/movie-repository.interface";
import ApiError from "../../../core/ApiError";
import { IMovieService } from "../../../services/movies-service";
import { IUseCase } from "../../interfaces/use-case-interface";

export interface movieRequest {
    title: string;
    describe: string;
    image: string;
}

export type ICreateMovieUseCase = IUseCase<movieRequest, MovieDTO>

class CreateMovieUseCase implements ICreateMovieUseCase {

    constructor(private movieService: IMovieService) { }

    async exec({
        describe,
        image,
        title
    }: movieRequest): Promise<MovieDTO> {
        try {

            const movie = await this.movieService.create({
                describe,
                image,
                title
            })

            return movie;

        } catch (error) {
            throw new ApiError(500, 500, "Error to create movie")
        }
    }
}

export { CreateMovieUseCase }