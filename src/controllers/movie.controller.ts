import type { Request, Response } from "express";
import { searchMovies } from "../services/omdb.js";
import type { SearchQuery } from "../schemas/movie.schema.js";

export const movieController = {
    async getMovies(req: Request, res: Response) {
        const { title, page, type } = req.query as unknown as SearchQuery;

        const movies = await searchMovies({ title, page, type });

        return res.json(movies);
    },
};
