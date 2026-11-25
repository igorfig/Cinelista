import type {
    GetListParams,
    createListInput,
    updateListInput,
} from "../schemas/list.schema.js";

import type { AddMovieToListBody } from "../schemas/movie.schema.js";
import { listService } from "../services/list.service.js";
import type { Request, Response } from "express";

export const listController = {
    async findAll(_req: Request, res: Response) {
        const lists = await listService.findAll();

        return res.json(lists);
    },

    async findById(req: Request<{ listId: string }>, res: Response) {
        const list = await listService.findById(req.params.listId);

        return res.json(list);
    },

    async create(req: Request, res: Response) {
        const data: createListInput = await req.body;

        await listService.create(data);

        return res.sendStatus(201);
    },

    async update(req: Request<{ listId: string }>, res: Response) {
        const { listId } = req.params;
        const data: updateListInput = await req.body;

        const listUpdated = await listService.update(listId, data);

        return res.json(listUpdated);
    },

    async delete(req: Request<{ listId: string }>, res: Response) {
        const { listId } = req.params;

        await listService.delete(listId);

        return res.sendStatus(204);
    },

    async addMovie(
        req: Request<GetListParams, unknown, AddMovieToListBody>,
        res: Response,
    ) {
        const { listId } = req.params;
        const { imdbId } = req.body;

        await listService.addMovie(listId, imdbId);

        return res.sendStatus(201);
    },

    async deleteMovie(
        req: Request<{ listId: string; movieId: string }>,
        res: Response,
    ) {
        const { listId, movieId } = req.params;

        await listService.deleteMovie(listId, movieId);

        return res.sendStatus(204);
    },
};
