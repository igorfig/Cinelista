import { z } from "zod";

export const getListSchema = {
    params: z.object({
        id: z.uuid(),
    }),
};

export const createListSchema = {
    body: z.object({
        title: z.string().min(1).trim(),
        description: z.string().trim().optional(),
        author: z.string().trim(),
    }),
};

export const updateListSchema = {
    body: createListSchema.body.partial(),
    params: getListSchema.params,
};

export type createListInput = z.infer<typeof createListSchema.body>;
export type updateListInput = z.infer<typeof updateListSchema.body>;
