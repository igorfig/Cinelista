export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode = 500,
        public readonly code = "INTERNAL_ERROR",
        public readonly details?: unknown,
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} não encontrado`, 404, "NOT_FOUND");
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, "CONFLICT");
    }
}

export class ValidationError extends AppError {
    constructor(details: unknown) {
        super("Dados inválidos", 400, "VALIDATION_ERRROR", details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Não autorizado") {
        super(message, 401, "UNAUTHORIZED");
    }
}
