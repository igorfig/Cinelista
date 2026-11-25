import { Router } from "express";
import { listController } from "../../controllers/list.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
    createListSchema,
    deleteMovieFromListSchema,
    getListSchema,
    updateListSchema,
} from "../../schemas/list.schema.js";
import { addMovieToListSchema } from "../../schemas/movie.schema.js";

export function listRoutes() {
    const router = Router();

    // Lista
    router.get("/", listController.findAll);

    router.get("/:listId", validate(getListSchema), listController.findById);

    router.post("/", validate(createListSchema), listController.create);
    router.patch("/:listId", validate(updateListSchema), listController.update);
    router.delete("/:listId", validate(getListSchema), listController.delete);

    // Filmes/Series da lista

    router.post(
        "/:listId/movies",
        validate(addMovieToListSchema),
        listController.addMovie,
    );
    router.delete(
        "/:listId/movies/:movieId",
        validate(deleteMovieFromListSchema),
        listController.deleteMovie,
    );

    return router;
}
