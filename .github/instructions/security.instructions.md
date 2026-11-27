---
applyTo: "src/**/*.ts, lib/**/*.ts"
---

# Security Guidelines

## 1. General Principles

- Treat security as a fundamental requirement throughout development.
- Apply secure coding practices appropriate to the project's architecture and technology stack.
- Consider security implications before introducing new features, dependencies, endpoints, or integrations.
- Never assume that incoming data, requests, or external services are trustworthy.
- Prefer established and well-maintained security practices over custom implementations.

## 2. Input Validation and Data Handling

- Validate all external input using the existing Zod validation approach.
- Never trust data simply because it comes from the frontend or another internal application.
- Validate route parameters, query strings, request bodies, and other externally supplied values.
- Use appropriate constraints to prevent malformed or unexpected data from reaching application logic.
- Avoid unsafe type assertions that bypass validation.
- Normalize or sanitize data when necessary for its intended use.
- Do not use sanitization as a replacement for context-appropriate output encoding or parameterized database operations.

## 3. Authentication and Authorization

When implementing authentication and authorization:

- Use secure, established authentication mechanisms.
- Never assume that authentication alone grants permission to access a resource.
- Verify resource ownership and user permissions on the server.
- Apply authorization checks to operations involving private or user-owned resources.
- Prevent users from accessing or modifying resources belonging to other users without permission.
- Avoid trusting user identifiers or ownership information supplied by the client.
- Follow the principle of least privilege.

Authentication and authorization must be enforced on the backend, regardless of frontend restrictions.

## 4. Passwords and Credentials

- Never store passwords in plaintext.
- Use an established password hashing algorithm designed for password storage.
- Never log passwords, authentication tokens, API keys, or other sensitive credentials.
- Do not expose credentials in API responses or error messages.
- Keep secrets in environment variables or an appropriate secrets management solution.
- Never hardcode production credentials or commit secret values to the repository.
- Use separate credentials and configurations for development and production environments.

## 5. Database Security

- Use Prisma and its parameterized query mechanisms for database access.
- Avoid unsafe raw SQL queries.
- When raw SQL is necessary, use parameterized queries and never concatenate untrusted input into SQL statements.
- Enforce ownership and access restrictions in database operations where appropriate.
- Consider database constraints as an additional protection against invalid or inconsistent data.
- Avoid exposing internal database errors, SQL statements, or schema details to API consumers.
- Review destructive database operations and migrations carefully before execution.

## 6. API Security

- Avoid exposing sensitive information through API responses.
- Return only the fields required by the consumer.
- Apply authentication and authorization to protected endpoints.
- Prevent unauthorized access to private resources.
- Consider rate limiting for authentication, sensitive operations, and endpoints vulnerable to abuse.
- Configure CORS according to the application's actual requirements.
- Do not use unrestricted CORS configurations in production without a clear justification.
- Avoid leaking stack traces, internal paths, environment variables, or implementation details.
- Consider pagination and query limits to prevent excessive resource consumption.

## 7. External Services and Integrations

- Treat data received from external APIs as untrusted.
- Handle network failures, unexpected responses, and service unavailability safely.
- Never expose API keys or credentials used by external integrations.
- Apply reasonable timeouts to external requests when appropriate.
- Avoid allowing external responses to directly control sensitive application behavior without validation.
- Consider the security implications of user-controlled URLs or other inputs used in external requests.

## 8. Error Handling and Logging

- Never expose sensitive information in error responses.
- Keep detailed diagnostic information in server-side logs when appropriate.
- Avoid logging passwords, tokens, secrets, personal data, or sensitive request payloads.
- Ensure unexpected errors do not reveal internal implementation details.
- Preserve useful diagnostic context without compromising user privacy.
- Do not suppress security-relevant errors or failures.

## 9. Dependencies and Configuration

- Prefer maintained and reputable dependencies.
- Evaluate dependency security, maintenance status, and compatibility before introducing packages.
- Avoid unnecessary dependencies that increase the attack surface.
- Do not disable security protections merely to simplify implementation.
- Keep environment-specific configuration separate.
- Ensure development-only settings do not accidentally reach production.
- Never assume that default configurations are secure for every deployment environment.

## 10. Security Review Before Implementation

Before implementing or modifying security-sensitive functionality, consider:

- Authentication and authorization requirements.
- Resource ownership and access control.
- Input validation and data exposure.
- Database access and query safety.
- Credential and secret management.
- Abuse scenarios and resource consumption.
- Error handling and logging.
- Compatibility with existing security mechanisms.

For significant security-related changes, explain the proposed approach and its implications before implementation.

Never claim that a feature is secure merely because it follows these guidelines. Identify relevant limitations, assumptions, and risks when necessary.
