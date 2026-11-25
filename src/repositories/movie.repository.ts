import { prisma } from "../../lib/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import { omitUndefined } from "../utils/omitUndefined.js";

export const movieRepository = {
    findByImdbId(imdbId: string) {
        return prisma.movie.findUnique({
            where: { imdbId },
        });
    },

    upsert(data: Prisma.MovieCreateInput) {
        return prisma.movie.upsert({
            where: { imdbId: data.imdbId },
            update: {},
            create: omitUndefined(data),
        });
    },

    delete(movieId: string) {
        return prisma.movie.delete({ where: { id: movieId } });
    },
};
