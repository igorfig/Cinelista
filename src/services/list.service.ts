import { NotFoundError } from "../errors/AppError.js";
import { listRepository } from "../repositories/list.repository.js";
import type {
    createListInput,
    updateListInput,
} from "../schemas/list.schema.js";

export const listService = {
    findAll() {
        const lists = listRepository.findAll();

        return lists;
    },

    async findById(id: string) {
        const list = await listRepository.findById(id);

        if (!list) throw new NotFoundError("Lista");

        return list;
    },

    create(data: createListInput) {
        return listRepository.create(data);
    },

    async update(listId: string, data: updateListInput) {
        const list = await listRepository.findById(listId);

        if (!list) throw new NotFoundError("Lista");

        const updatedList = listRepository.update(listId, data);

        return updatedList;
    },

    async delete(listId: string) {
        const list = await listRepository.findById(listId);

        if (!list) throw new NotFoundError("Lista");

        return listRepository.delete(listId);
    },
};
