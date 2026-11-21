import { listRepository } from "../repositories/list.repository.js";
import type { createListInput } from "../schemas/list.schema.js";

export const listService = {
    findAll() {
        const lists = listRepository.findAll();

        return lists;
    },

    findById(id: string) {
        const list = listRepository.findById(id);

        return list;
    },

    create(data: createListInput) {
        return listRepository.create(data);
    },
};
