import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const notFoundHandler = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    next(
        new AppError(
            `Rota ${req.method} ${req.path} não encontrada`,
            404,
            "ROUTE_NOT_FOUND",
        ),
    );
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
    }

    console.error({ err, method: req.method, url: req.originalUrl });

    res.status(500).json({
        error: {
            code: "INTERNAL_ERROR",
            message: "Erro interno do servidor",
        },
    });
};
