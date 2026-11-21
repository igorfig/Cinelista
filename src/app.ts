import type { Express } from "express";
import express from "express";
import { router } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
const app: Express = express();

app.use(express.json());
app.use("/api", router);

app.use(notFoundHandler);
app.use(errorHandler);
export { app };
