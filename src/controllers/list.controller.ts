import type { List } from "../generated/prisma/client.js";
import type { createListInput } from "../schemas/list.schema.js";
import { listService } from "../services/list.service.js";
import type { Request, Response } from "express";

export const listController = {
    async findAll(_req: Request, res: Response) {
        const lists = await listService.findAll();

        return res.json(lists);
    },

    async findById(req: Request<{ id: string }>, res: Response) {
        const list = await listService.findById(req.params.id);

        return res.json(list);
    },

    async create(req: Request, res: Response) {
        const data: createListInput = await req.body;

        await listService.create(data);

        return res.sendStatus(201);
    },
};
