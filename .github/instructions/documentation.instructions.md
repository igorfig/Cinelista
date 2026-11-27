---
applyTo: "docs/**/*.md, src/**/*.ts"
---

# Documentation Guidelines

## 1. General Principles

- Keep documentation clear, accurate, consistent, and aligned with the actual implementation.
- Documentation must describe existing behavior, not intended or speculative functionality.
- Prefer concise explanations that provide practical value.
- Avoid duplicating information that can be maintained in a single source of truth.
- Update relevant documentation whenever implementation changes make it outdated.
- Write technical documentation in English.

## 2. API Documentation

The project intends to use OpenAPI as its API documentation standard, with Swagger UI as the interactive documentation interface.

When implementing API documentation:

- Use the OpenAPI specification to describe the API.
- Document existing endpoints, HTTP methods, parameters, request bodies, responses, and status codes.
- Include relevant error responses and examples.
- Describe required and optional fields accurately.
- Document authentication and authorization requirements when implemented.
- Keep documented behavior consistent with the actual API contract.
- Do not document endpoints or features that have not been implemented.

## 3. Schema Reuse

- Keep Zod schemas close to their existing domain-specific implementation.
- Reuse existing Zod schemas for API documentation whenever supported by the chosen tooling.
- Avoid maintaining separate validation definitions that duplicate the same rules.
- Add documentation-specific metadata when necessary, without compromising runtime validation.
- If a schema cannot be represented accurately in OpenAPI, document the limitation and provide an appropriate alternative.

## 4. Documentation Organization

Follow a centralized and maintainable documentation structure.

- Keep the central OpenAPI configuration separate from individual endpoint documentation.
- Organize endpoint documentation in a dedicated structure when appropriate.
- Keep documentation responsibilities clear and avoid unnecessary fragmentation.
- Follow the existing project structure when introducing documentation files.
- Do not create additional documentation directories or abstractions without a clear need.

## 5. Endpoint Documentation Quality

Each documented endpoint should provide the relevant information:

- Endpoint path and HTTP method.
- Short description of its purpose.
- Authentication and authorization requirements, when applicable.
- Path parameters and query parameters.
- Request body structure, when applicable.
- Successful response status codes and response structure.
- Possible error responses.
- Examples of requests and responses when they improve understanding.

Documentation should be specific enough for another developer to understand and use the endpoint without inspecting its implementation.

## 6. Examples and Accuracy

- Use realistic examples that match the actual API contract.
- Keep examples consistent with the corresponding Zod schemas and TypeScript types.
- Never include real passwords, API keys, tokens, or other secrets.
- Avoid using misleading placeholder values that could be mistaken for real credentials.
- Do not invent response fields, status codes, validation rules, or endpoint behavior.
- Review examples whenever the corresponding implementation changes.

## 7. Architecture and Developer Documentation

When documenting internal architecture or development workflows:

- Explain the responsibilities of relevant modules and layers.
- Describe important dependencies and data flows.
- Include setup instructions only when they have been verified.
- Explain non-obvious technical decisions when doing so helps future maintenance.
- Keep documentation aligned with the actual repository structure.
- Avoid documenting implementation details that are likely to change without providing meaningful value.

## 8. Documentation Tooling and Dependencies

- Do not introduce OpenAPI generators, Zod integrations, Swagger UI packages, or other documentation dependencies without prior approval.
- Before proposing a tool, explain its purpose, compatibility, maintenance status, and alternatives.
- Prefer solutions that reuse existing Zod schemas and minimize duplicated definitions.
- Verify compatibility with the installed versions of TypeScript, Express, and Zod before proposing an integration.

## 9. Documentation Maintenance

Whenever an API endpoint, schema, response, authentication mechanism, or relevant architecture changes:

- Identify which documentation is affected.
- Update the relevant documentation when necessary.
- Remove outdated descriptions and examples.
- Verify that documented behavior matches the implementation.
- Do not claim documentation is complete if relevant endpoints or behaviors remain undocumented.

Documentation is part of the implementation and should evolve alongside the project.
