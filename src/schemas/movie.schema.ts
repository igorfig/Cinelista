import { z } from "zod";
import { getListSchema } from "./list.schema.js";

export const addMovieToListSchema = {
    params: getListSchema.params,
    body: z.object({
        imdbId: z
            .string({ error: "O IMDb ID deve ser um texto" })
            .trim()
            .regex(/^tt\d+$/, { error: "O IMDb ID deve estar no formato tt1234567" }),
    }),
};

export const searchMoviesSchema = {
    query: z.object({
        title: z
            .string({ error: "O título deve ser um texto" })
            .trim()
            .min(1, { error: "O título é obrigatório" }),
        page: z.coerce.number().int().min(1).default(1),
        type: z.enum(["movie", "series"]).default("movie"),
    }),
};

export type AddMovieToListBody = z.infer<typeof addMovieToListSchema.body>;

export type SearchQuery = z.infer<typeof searchMoviesSchema.query>;
