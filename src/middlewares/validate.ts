import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/AppError.js";

type Schemas = {
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
};

export const validate =
    (schemas: Schemas) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const errors: Record<string, unknown> = {};

        for (const target of ["body", "params", "query"] as const) {
            const schema = schemas[target];
            if (!schema) continue;

            const result = schema.safeParse(req[target]);

            if (result.success) {
                Object.defineProperty(req, target, {
                    value: result.data,
                    writable: true,
                    configurable: true,
                });
            } else {
                errors[target] = z.treeifyError(result.error);
            }
        }

        if (Object.keys(errors).length > 0) {
            return next(new ValidationError(errors));
        }

        next();
    };
