import { z } from "zod";

export const getListSchema = {
    params: z.object({
        listId: z.uuid({ error: "O ID da lista deve ser um UUID válido" }),
    }),
};

export const createListSchema = {
    body: z.object({
        title: z
            .string({ error: "O título deve ser um texto" })
            .trim()
            .min(1, { error: "O título é obrigatório" }),
        description: z
            .string({ error: "A descrição deve ser um texto" })
            .trim()
            .optional(),
        author: z
            .string({ error: "O autor deve ser um texto" })
            .trim()
            .min(1, { error: "O autor é obrigatório" }),
    }),
};

export const updateListSchema = {
    body: createListSchema.body
        .partial()
        .refine((data) => Object.keys(data).length > 0, {
            error: "Informe ao menos um campo para atualizar",
        }),
    params: getListSchema.params,
};

export const deleteMovieFromListSchema = {
    params: getListSchema.params.extend({
        movieId: z.uuid({ error: "O ID do filme deve ser um UUID válido" }),
    }),
};

export type GetListParams = z.infer<typeof getListSchema.params>;
export type createListInput = z.infer<typeof createListSchema.body>;
export type updateListInput = z.infer<typeof updateListSchema.body>;
