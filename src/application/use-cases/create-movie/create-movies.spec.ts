import { CreateMovieUseCase, ICreateMovieUseCase } from "./create-movie.use-cases";

let sut: ICreateMovieUseCase;

describe("Create Movie Use Case", () => {

    beforeEach(() => {
        sut = new CreateMovieUseCase();
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