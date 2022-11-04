interface IMovieRepository {
    create(movie: MovieDTO): Promise<MovieDTO>
}

interface MovieDTO {
    id?: string;
    title: string;
    describe: string;
    image: string;
}


export {
    MovieDTO,
    IMovieRepository
}