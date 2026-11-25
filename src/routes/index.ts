import { Router } from "express";
import { listRoutes } from "./Lists/route.js";
import { movieRoutes } from "./Movies/route.js";

export const router = Router();

router.use("/lists", listRoutes());
router.use("/movies", movieRoutes());
