---
applyTo: "src/**/*.ts, lib/**/*.ts"
---

# CineLista — Architecture Guidelines

## 1. Architectural Overview

CineLista uses a layered backend architecture built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

The application separates HTTP routing, request handling, business logic, data persistence, validation, and cross-cutting concerns.

The current project structure includes:

```text
.
├── lib/
│   └── prisma.ts
│
├── prisma/
│   └── schema.prisma
│
└── src/
    ├── controllers/
    ├── errors/
    ├── middlewares/
    ├── repositories/
    ├── routes/
    ├── schemas/
    ├── services/
    ├── types/
    ├── utils/
    ├── app.ts
    └── server.ts
```

Respect the existing structure and naming conventions.

Do not reorganize directories or introduce additional architectural layers without a concrete justification.

## 2. Application Flow

The expected request flow is:

```text
HTTP Request
     |
     v
Express Application
     |
     v
Routes
     |
     v
Middlewares
     |
     v
Controllers
     |
     v
Services
     |
     v
Repositories
     |
     v
Prisma ORM
     |
     v
PostgreSQL
```

External integrations, such as OMDb, are handled through dedicated service modules.

Errors propagate through the application and are handled by the centralized error-handling middleware.

Not every operation needs to use every layer. Keep the flow proportional to the complexity of the operation.

## 3. Layer Responsibilities

### 3.1 Routes

Location: `src/routes/`

Routes define the HTTP endpoints exposed by the application.

Responsibilities:

- Define HTTP methods and endpoint paths.
- Associate endpoints with their respective controllers.
- Register applicable middlewares.
- Organize endpoints by functional domain.

Routes should remain focused on HTTP routing and endpoint composition.

Do not implement business logic, database operations, or complex validation directly inside route definitions.

Follow the existing pattern of grouping routes by domain and exporting router factories when appropriate.

### 3.2 Controllers

Location: `src/controllers/`

Controllers handle incoming HTTP requests and construct HTTP responses.

Responsibilities:

- Extract validated request data.
- Call the appropriate service methods.
- Return appropriate HTTP status codes and response data.
- Keep HTTP-specific concerns separate from business logic.

Controllers should not contain database queries or substantial business rules.

Avoid duplicating service responsibilities inside controllers.

### 3.3 Services

Location: `src/services/`

Services contain application and business logic.

Responsibilities:

- Implement business rules.
- Coordinate operations between repositories and other services.
- Validate business conditions, such as resource existence.
- Coordinate external integrations when necessary.
- Raise appropriate application errors.

Services should not depend on Express request or response objects.

Keep business logic independent of HTTP-specific implementation details.

When an operation requires multiple repositories or services, coordinate them here rather than placing that orchestration inside controllers.

### 3.4 Repositories

Location: `src/repositories/`

Repositories centralize data persistence and database access.

Responsibilities:

- Execute database queries through Prisma.
- Create, retrieve, update, and delete persistent records.
- Encapsulate database-specific operations.
- Return persistence results to the service layer.

Repositories should not contain HTTP logic or application-level business rules.

Avoid duplicating database queries across services when an existing repository method can reasonably be reused.

Do not introduce unnecessary repository abstractions or generic persistence layers.

### 3.5 Schemas

Location: `src/schemas/`

Zod schemas define and validate external input data.

Responsibilities:

- Validate request bodies.
- Validate route parameters.
- Validate query parameters.
- Apply appropriate transformations and defaults.
- Provide TypeScript types inferred from schemas when appropriate.

Keep input validation separate from business rules.

A schema should validate whether input has the expected structure and format. Services remain responsible for validating business conditions.

### 3.6 Middlewares

Location: `src/middlewares/`

Middlewares handle cross-cutting HTTP concerns.

Current responsibilities include:

- Request validation.
- Centralized error handling.
- Handling requests for undefined routes.

Middlewares should remain reusable and independent of individual business operations whenever possible.

Do not place domain-specific business logic inside generic middleware.

### 3.7 Errors

Location: `src/errors/`

Application errors are represented by custom error classes.

The existing implementation includes:

- `AppError`
- `NotFoundError`
- `ConflictError`
- `ValidationError`
- `UnauthorizedError`

Reuse existing error classes when their semantics match the situation.

Introduce additional custom error classes when a real application requirement justifies them.

Avoid redundant error classes or inconsistent error-handling patterns.

Errors should propagate to the centralized error handler rather than being manually converted into HTTP responses throughout services.

### 3.8 Types

Location: `src/types/`

This directory contains shared TypeScript types that do not belong exclusively to a specific implementation module.

Keep types close to their domain when they are only used by one component.

Do not create unnecessary global types or duplicate types that can be safely inferred from existing schemas or libraries.

### 3.9 Utilities

Location: `src/utils/`

Utilities contain reusable functions that support multiple parts of the application.

Keep utilities focused and independent of specific business operations.

Do not move ordinary business logic into utilities merely to make service files shorter.

## 4. Application Initialization

### `src/app.ts`

The Express application is configured separately from the server entry point.

Responsibilities include:

- Creating the Express application.
- Registering global middleware.
- Registering the main API router.
- Registering the not-found handler.
- Registering the centralized error handler.
- Exporting the configured application.

Preserve this separation because it allows the application to be imported independently of the network listener, which is useful for automated testing.

### `src/server.ts`

The server entry point starts the HTTP listener using the configured Express application.

Keep server startup concerns separate from application configuration.

Do not move the application's route or middleware configuration into the server entry point.

## 5. Database Access

The project uses Prisma ORM with PostgreSQL.

The Prisma client is initialized in `lib/prisma.ts` and imported by repositories.

Guidelines:

- Keep database operations inside repositories.
- Use the existing Prisma client instead of creating unnecessary additional instances.
- Respect the current Prisma schema and generated client configuration.
- Keep persistence operations consistent with existing repository conventions.
- Avoid exposing Prisma-specific implementation details to controllers.
- Evaluate transaction requirements when an operation involves multiple dependent database writes.

Changes to the Prisma schema or database structure require careful evaluation because they can affect existing data and application behavior.

## 6. External Integrations

External services, such as OMDb, should be encapsulated in dedicated modules.

The current OMDb integration is implemented in `src/services/omdb.ts`.

Guidelines:

- Keep external API communication separate from controllers and repositories.
- Avoid spreading external API requests across unrelated application modules.
- Convert external responses into data structures appropriate for the application.
- Handle external service failures appropriately.
- Do not assume external responses are always valid or successful.
- Keep API credentials and other secrets in environment variables.

Services may coordinate external integrations with repositories when a business operation requires both.

## 7. Dependency Direction

Maintain clear dependency boundaries:

- Routes depend on controllers, schemas, and applicable middlewares.
- Controllers depend on services and relevant types.
- Services depend on repositories, other services, and relevant types.
- Repositories depend on database infrastructure and persistence-related types.
- Middlewares should depend only on the components necessary for their responsibilities.

Avoid circular dependencies.

Do not make lower-level components depend on HTTP controllers or route implementations.

A component should depend on another layer only when the dependency is justified by its responsibilities.

## 8. Architectural Evolution

The current architecture is appropriate for the project's present scope.

Do not introduce additional layers, design patterns, dependency injection frameworks, interfaces, or abstractions merely to follow architectural trends.

When a new requirement challenges the current structure:

1. Understand the existing implementation.
2. Identify the actual architectural limitation.
3. Evaluate whether the current structure can accommodate the requirement.
4. Consider the simplest sustainable solution.
5. Explain significant architectural changes before implementing them.

Small improvements that preserve existing contracts and behavior may be implemented directly.

Significant changes to responsibilities, dependencies, data flow, or architecture require the user's approval.

## 9. General Rules

- Preserve separation of concerns.
- Keep each component focused on its primary responsibility.
- Avoid business logic in routes and controllers.
- Avoid database access outside repositories.
- Avoid HTTP-specific dependencies inside services.
- Keep validation and business rules separate.
- Prefer existing project patterns when they remain appropriate.
- Do not introduce unnecessary abstractions.
- Do not refactor unrelated components without authorization.
- Keep architectural decisions proportional to the project's actual needs.

The goal is to maintain a clear, consistent, and maintainable architecture while allowing CineLista to evolve naturally.
