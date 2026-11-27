---
applyTo: "src/routes/**/*.ts, src/controllers/**/*.ts, src/services/**/*.ts, src/schemas/**/*.ts, src/middlewares/**/*.ts"
---

# API Development Guidelines

## 1. General Principles

- Follow the existing Express 5 architecture and conventions.
- Keep HTTP concerns separate from business logic and data persistence.
- Maintain consistency across endpoints, request validation, response formats, and error handling.
- Prefer predictable and explicit API behavior.
- Do not introduce new response formats or architectural patterns without a clear reason.

## 2. Request Lifecycle

Follow the existing request flow:

1. **Routes:** define HTTP methods, paths, and middleware.
2. **Validation middleware:** validate request body, parameters, and query strings.
3. **Controllers:** handle HTTP-specific concerns and delegate operations.
4. **Services:** execute business rules and coordinate operations.
5. **Repositories:** interact with the database through Prisma.
6. **Error handler:** centralize and format errors.

Not every operation needs to use every layer. Keep implementations proportional to their complexity.

## 3. Routes

- Routes must define endpoint paths, HTTP methods, and the middleware required by the endpoint.
- Keep route definitions focused on HTTP configuration.
- Apply the existing `validate` middleware to validate incoming request data.
- Delegate request handling to controllers instead of implementing business logic inside route files.
- Follow the existing domain-based route organization.
- Use appropriate HTTP methods according to the operation's semantics.

## 4. Controllers

- Controllers are responsible for handling HTTP requests and responses.
- Extract validated request data and pass it to the appropriate service.
- Keep business rules and database operations outside controllers.
- Avoid duplicating validation already performed by middleware.
- Return appropriate HTTP status codes and response bodies.
- Do not introduce unnecessary controller abstractions or classes.

## 5. Services

- Services contain application and business logic.
- Coordinate operations across repositories and external integrations when necessary.
- Enforce business rules that cannot be determined through structural input validation alone.
- Throw appropriate `AppError` subclasses when an operation cannot be completed.
- Avoid depending on Express request or response objects.
- Keep services focused on application behavior rather than HTTP response formatting.
- Avoid unnecessary database access or repeated existence checks.

## 6. Repositories

- Repositories are responsible for database persistence and retrieval.
- Use Prisma for database operations, following the existing repository patterns.
- Keep HTTP concerns and request validation outside repositories.
- Avoid placing business workflows or response formatting in repository methods.
- Handle database constraints appropriately and allow errors to be translated into application-level errors when necessary.
- Do not introduce another database access abstraction without a justified need.

## 7. Request Validation

Use Zod for validating incoming request data.

Validate the following request components when applicable:

- `body`: request payloads.
- `params`: route parameters.
- `query`: query string parameters.

Guidelines:

- Reuse existing schemas whenever appropriate.
- Infer TypeScript types from Zod schemas instead of maintaining duplicate definitions.
- Keep structural validation in schemas, including required fields, data types, formats, lengths, and basic constraints.
- Keep business validation in services.
- Keep persistence-related constraints in the database and repositories.
- Do not rely exclusively on TypeScript types to validate external input.
- Do not bypass validation through unsafe type assertions.

## 8. HTTP Status Codes and Responses

Use HTTP status codes according to the operation's outcome and semantics.

Common conventions:

| Status                      | Usage                                                                  |
| --------------------------- | ---------------------------------------------------------------------- |
| `200 OK`                    | Successful operations that return a response body.                     |
| `201 Created`               | Successful resource creation.                                          |
| `204 No Content`            | Successful operations that do not return a response body.              |
| `400 Bad Request`           | Invalid request data.                                                  |
| `401 Unauthorized`          | Missing or invalid authentication.                                     |
| `403 Forbidden`             | Authenticated user lacks permission.                                   |
| `404 Not Found`             | Requested resource does not exist.                                     |
| `409 Conflict`              | Operation conflicts with the current resource state or business rules. |
| `500 Internal Server Error` | Unexpected server errors.                                              |

Additional rules:

- Preserve the existing API response conventions.
- Successful responses should return the relevant resource or result directly.
- Do not introduce a universal success envelope such as `{ "data": ... }`.
- Do not return a response body with `204 No Content`.
- Avoid exposing internal implementation details in error responses.

## 9. Error Handling

- Use the existing `AppError` hierarchy for expected application errors.
- Reuse existing error classes whenever they represent the situation correctly.
- Introduce new error classes only when they represent a meaningful distinction.
- Let unexpected errors reach the centralized error handler.
- Do not duplicate error formatting across controllers and services.
- Do not silently swallow errors.
- Preserve the existing error response structure unless a deliberate API contract change is approved.

## 10. Express 5 and Asynchronous Operations

- Follow Express 5 behavior and the project's installed version.
- Use `async` functions for asynchronous request handlers when appropriate.
- Allow Express 5 to forward rejected promises from asynchronous route handlers to error-handling middleware.
- Avoid unnecessary wrappers for asynchronous handlers.
- Do not mix callback-based and promise-based error handling without a clear reason.

## 11. External Integrations

- Keep external API communication isolated from controllers and route definitions.
- Follow the existing OMDb integration structure in `src/services/omdb.ts`.
- Handle network failures, unsuccessful HTTP responses, and unexpected external response formats appropriately.
- Validate or safely interpret external data before using it in application logic.
- Do not expose external API credentials or internal integration details.
- Do not assume external services are always available.

## 12. API Contract Stability

Treat changes to existing endpoint behavior as potentially breaking changes.

Before changing an existing API contract, consider:

- HTTP method and endpoint path.
- Required and optional request fields.
- Parameter and query formats.
- Response structure.
- HTTP status codes.
- Error codes and messages.

Significant contract changes must be explained and approved before implementation.

Do not add speculative endpoints or features that are not part of the current project requirements.
