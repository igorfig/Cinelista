import { prisma } from "../../lib/prisma.js";
import type {
    createListInput,
    updateListInput,
} from "../schemas/list.schema.js";
import { omitUndefined } from "../utils/omitUndefined.js";

export const listRepository = {
    findAll() {
        return prisma.list.findMany();
    },

    findById(listId: string) {
        return prisma.list.findUnique({
            where: {
                id: listId,
            },
            include: {
                movies: { include: { movie: true } },
            },
        });
    },

    create(data: createListInput) {
        return prisma.list.create({
            data: omitUndefined(data),
        });
    },

    update(listId: string, data: updateListInput) {
        return prisma.list.update({
            where: { id: listId },
            data: omitUndefined(data),
        });
    },

    delete(listId: string) {
        return prisma.list.delete({
            where: { id: listId },
        });
    },
};
