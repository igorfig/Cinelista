import { z } from "zod";

export const AddMovieSchema = {
    body: z.object({
        imdbId: z
            .string({ error: "O IMDb ID deve ser um texto" })
            .trim()
            .min(1, { error: "O IMDb ID é obrigatório" }),
        title: z
            .string({ error: "O título deve ser um texto" })
            .trim()
            .min(1, { error: "O título é obrigatório" }),
        type: z
            .string({ error: "O tipo deve ser um texto" })
            .trim()
            .min(1, { error: "O tipo é obrigatório" }),
        released: z
            .string({ error: "A data de lançamento deve ser um texto de data válido" })
            .trim()
            .min(1, { error: "A data de lançamento não pode ser vazia" })
            .pipe(z.coerce.date({ error: "A data de lançamento é inválida" }))
            .optional(),
        genre: z.string({ error: "O gênero deve ser um texto" }).trim().optional(),
        runtime: z.string({ error: "A duração deve ser um texto" }).trim().optional(),
        plot: z.string({ error: "A sinopse deve ser um texto" }).trim().optional(),
        poster: z.string({ error: "O pôster deve ser um texto" }).trim().optional(),
    }),
};

export type AddMovieInput = z.infer<typeof AddMovieSchema.body>;
