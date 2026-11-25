import { NotFoundError } from "../errors/AppError.js";
import { movieRepository } from "../repositories/movie.repository.js";
import { getMovieByImdbId } from "./omdb.js";

export const movieService = {
    async findOrCreate(imdbId: string) {
        const existing = await movieRepository.findByImdbId(imdbId);

        if (existing) return existing;

        const data = await getMovieByImdbId(imdbId);

        if (!data) throw new NotFoundError("Filme/Série");

        return movieRepository.upsert(data);
    },
};
