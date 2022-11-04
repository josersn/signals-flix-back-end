import { MovieRepositoryInMemory } from "../../../../domain/repositories/in-memory/movies.repos";
import { IMovieRepository } from "../../../../domain/repositories/interfaces/movie-repository.interface";
import { IMovieService, MovieService } from "../../../services/movie-service";
import { CreateMovieUseCase, ICreateMovieUseCase } from "./create-movie.use-cases";

let sut: ICreateMovieUseCase;
let service: IMovieService;
let repository: IMovieRepository;

describe("Create Movie Use Case", () => {

    beforeEach(() => {
        repository = new MovieRepositoryInMemory();
        service = new MovieService(repository);
        sut = new CreateMovieUseCase(service);
    })

    it("Should be able to create a movies", async () => {

        const data = {
            title: "Movie One",
            describe: "Description Movie One",
            image: "movie-image.com.br"
        };

        const movie = await sut.exec(data);

        expect(movie).toBeTruthy();
        expect(movie).toHaveProperty("id");

    });
})