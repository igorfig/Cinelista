import { Router } from "express";
import { movieController } from "../../controllers/movie.controller.js";
import { validate } from "../../middlewares/validate.js";
import { searchMoviesSchema } from "../../schemas/movie.schema.js";

export function movieRoutes() {
    const router = Router();

    router.get(
        "/search",
        validate(searchMoviesSchema),
        movieController.getMovies,
    );

    return router;
}
