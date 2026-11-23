import { Router } from "express";
import { listController } from "../../controllers/list.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
    createListSchema,
    getListSchema,
    updateListSchema,
} from "../../schemas/list.schema.js";

export function listRoutes() {
    const router = Router();

    // Lista
    router.get("/", listController.findAll);

    router.get("/:listId", validate(getListSchema), listController.findById);

    router.post("/", validate(createListSchema), listController.create);
    router.patch("/:listId", validate(updateListSchema), listController.update);
    router.delete("/:listId", validate(getListSchema), listController.delete);

    // Filmes/Series da lista

    // router.post("/:listId/movies");
    // router.delete("/:listId/movies/:movieId");

    return router;
}
