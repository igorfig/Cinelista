import { Router } from "express";
import { listRoutes } from "./Lists/route.js";

export const router = Router();

router.use("/lists", listRoutes());
