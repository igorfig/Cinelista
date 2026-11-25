import { NotFoundError } from "../errors/AppError.js";
import { listRepository } from "../repositories/list.repository.js";
import type {
    createListInput,
    updateListInput,
} from "../schemas/list.schema.js";
import { movieService } from "./movie.service.js";

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
        const list = await listRepository.existsById(listId);

        if (!list) throw new NotFoundError("Lista");

        const updatedList = listRepository.update(listId, data);

        return updatedList;
    },

    async delete(listId: string) {
        const list = await listRepository.existsById(listId);

        if (!list) throw new NotFoundError("Lista");

        return listRepository.delete(listId);
    },

    async addMovie(listId: string, imdbId: string) {
        const list = await listRepository.existsById(listId);

        if (!list) throw new NotFoundError("Lista");

        const movie = await movieService.findOrCreate(imdbId);
        await listRepository.addMovie(listId, movie.id);

        return movie;
    },

    async deleteMovie(listId: string, movieId: string) {
        const { count } = await listRepository.deleteMovie(listId, movieId);

        if (count === 0) {
            const list = await listRepository.existsById(listId);

            if (!list) throw new NotFoundError("Lista");
            throw new NotFoundError("Filme/série na lista");
        }
    },
};
