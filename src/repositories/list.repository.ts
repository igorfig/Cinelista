import { prisma } from "../../lib/prisma.js";
import type { createListInput } from "../schemas/list.schema.js";

export const listRepository = {
    findAll() {
        return prisma.list.findMany();
    },

    findById(id: string) {
        return prisma.list.findUnique({
            where: {
                id,
            },
        });
    },

    create(data: createListInput) {
        return prisma.list.create({
            data,
        });
    },
};
