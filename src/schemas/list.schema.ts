import { z } from "zod";

export const getUserSchema = {
    params: z.object({
        id: z.uuid(),
    }),
};

export const createListSchema = {
    body: z.object({
        title: z.string().trim(),
        description: z.string().trim(),
        author: z.string().trim(),
    }),
};

export type createListInput = z.infer<typeof createListSchema.body>;
