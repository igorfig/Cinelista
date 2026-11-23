import type { List } from "../generated/prisma/client.js";
import type {
    createListInput,
    updateListInput,
} from "../schemas/list.schema.js";
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
        const { listId } = await req.params;
        const data: updateListInput = await req.body;

        const listUpdated = await listService.update(listId, data);

        return res.json(listUpdated);
    },

    async delete(req: Request<{ listId: string }>, res: Response) {
        const { listId } = await req.params;

        await listService.delete(listId);

        return res.sendStatus(204);
    },
};
