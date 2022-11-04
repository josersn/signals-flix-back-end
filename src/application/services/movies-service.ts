import { IMovieRepository, MovieDTO } from "../../domain/repositories/interfaces/movie-repository.interface"

interface IMovieService {
    create(data: MovieDTO): Promise<MovieDTO>
}

class MovieService implements IMovieService {

    constructor(private movieRepository: IMovieRepository) { }


    async create(data: MovieDTO): Promise<MovieDTO> {
        return this.movieRepository.create(data);
    }

}

export {
    IMovieService,
    MovieService
}