import { Movie } from "../../entities/movie";
import { IMovieRepository, MovieDTO } from "../interfaces/movie-repository.interface";

class MovieRepositoryInMemory implements IMovieRepository {

    private movies: Movie[];

    constructor() {
        this.movies = []
    }

    async create({
        describe,
        image,
        title
    }: MovieDTO): Promise<MovieDTO> {
        const movie = new Movie();

        Object.assign(movie, {
            id: "1",
            describe,
            image,
            title
        })

        this.movies.push(movie)

        return movie;
    }
}

export { MovieRepositoryInMemory }