import { Router } from "express";
import { listController } from "../../controllers/list.controller.js";
import { validate } from "../../middlewares/validate.js";
import { createListSchema, getUserSchema } from "../../schemas/list.schema.js";

export function listRoutes() {
    const router = Router();

    router.get("/", listController.findAll);

    router.get("/:id", validate(getUserSchema), listController.findById);

    router.post("/", validate(createListSchema), listController.create);
    router.patch("/:id", () => {});
    router.delete("/:id", () => {});

    return router;
}
