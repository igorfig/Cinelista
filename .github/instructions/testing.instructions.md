---
applyTo: "**/*.test.ts, **/*.spec.ts, **/tests/**/*.ts"
---

# Testing Guidelines

## 1. General Principles

- Treat automated testing as an essential part of development.
- Prioritize meaningful tests that verify actual application behavior.
- Write tests that are readable, maintainable, deterministic, and independent.
- Prefer testing observable behavior over internal implementation details.
- Avoid writing tests solely to increase code coverage.
- Follow the project's existing testing conventions and configuration.
- Do not modify production code solely to make tests easier unless the change is justified.

## 2. Testing Framework

- Use Vitest as the project's testing framework.
- Respect the installed Vitest version and its supported APIs.
- Do not assume that APIs available in other Vitest versions are supported.
- Use TypeScript for test files.
- Follow the `*.test.ts` naming convention.
- Keep test configuration centralized and consistent.
- Do not introduce additional testing frameworks without prior approval.

## 3. Unit Tests

Unit tests should verify individual functions or components of application logic in isolation.

Prioritize testing:

- Service business rules.
- Utility functions.
- Validation-related behavior when appropriate.
- Error conditions and edge cases.
- Functions with meaningful decision-making or transformations.

Guidelines:

- Isolate the unit under test from unrelated dependencies.
- Mock external dependencies when isolation is necessary.
- Avoid mocking the function or behavior being tested.
- Test both successful and unsuccessful execution paths.
- Keep each test focused on a specific behavior.
- Avoid excessive mocking that makes tests unrealistic or difficult to understand.

## 4. Integration Tests

Integration tests should verify that multiple components work correctly together.

Prioritize testing:

- HTTP endpoints and request handling.
- Middleware execution.
- Request validation.
- Controller and service interactions.
- Repository and database interactions.
- Error handling and response formatting.
- External integration boundaries when appropriate.

Guidelines:

- Test behavior through realistic interactions whenever practical.
- Use an isolated test database for tests that require database access.
- Never run destructive integration tests against development or production databases.
- Ensure test data is isolated and cleaned up appropriately.
- Avoid depending on external services being available during test execution.
- Mock external services at their integration boundary when appropriate.

## 5. API Testing

When testing HTTP endpoints:

- Verify the expected HTTP status code.
- Verify response structure and relevant response values.
- Verify request validation for invalid or malformed input.
- Verify behavior when required resources do not exist.
- Verify expected application errors and unexpected failures.
- Verify authentication and authorization when implemented.
- Verify resource ownership and access restrictions when applicable.
- Verify that sensitive information is not exposed in responses.

Tests should reflect the actual API contract rather than assumptions about intended behavior.

## 6. Test Structure and Naming

- Organize tests according to the project's existing structure.
- Group related test cases using descriptive `describe` blocks.
- Use descriptive `it` or `test` names that explain the expected behavior.
- Prefer one primary behavior per test.
- Keep setup and teardown logic clear.
- Extract shared setup only when it improves readability and maintainability.
- Avoid overly generic test helpers.

Test names should describe behavior rather than implementation details.

## 7. Test Data and Isolation

- Use dedicated test data that is predictable and independent.
- Avoid relying on execution order between tests.
- Ensure tests do not depend on data left behind by previous executions.
- Clean up resources created during tests.
- Avoid hardcoded production identifiers or sensitive information.
- Use factories or fixtures only when they provide meaningful reuse.
- Do not introduce complex test data abstractions for simple test cases.

## 8. Mocking and External Dependencies

- Mock external APIs, network requests, and other dependencies when necessary.
- Prefer mocking at clear integration boundaries.
- Keep mocks as close as possible to the dependency being isolated.
- Avoid mocking internal implementation details unnecessarily.
- Ensure mocks accurately represent relevant dependency behavior.
- Restore or reset mocks between tests when needed.
- Do not allow tests to make unintended requests to production services.

## 9. Database Testing

- Use an isolated database environment for integration tests involving Prisma.
- Keep test database configuration separate from development and production configuration.
- Ensure test execution cannot accidentally modify production data.
- Test persistence behavior when it is relevant to the feature.
- Verify database constraints and relationships when appropriate.
- Clean up test records without compromising test isolation.
- Avoid relying exclusively on mocked repositories when the actual database interaction is the behavior being tested.

## 10. Test Quality and Coverage

- Focus on important business rules, critical paths, and failure scenarios.
- Include edge cases that could produce unexpected behavior.
- Avoid redundant tests that verify the same behavior without adding confidence.
- Do not chase arbitrary coverage percentages.
- Treat coverage as an indicator, not proof of correctness.
- Add regression tests when fixing bugs to prevent the same issue from returning.

## 11. Running and Reporting Tests

After implementing or modifying functionality:

- Run the relevant tests when possible.
- Run the broader test suite when the scope of the change justifies it.
- Report which tests were executed and their results.
- Clearly identify tests that could not be executed and explain why.
- Never claim that tests passed without actually running them.
- Never claim that functionality is fully tested when relevant scenarios remain uncovered.

## 12. Learning-Oriented Development

The project is also a learning environment.

When proposing or implementing tests:

- Prefer straightforward testing techniques before introducing advanced abstractions.
- Explain unfamiliar testing concepts when they are relevant.
- Help distinguish unit tests from integration tests and explain when each is appropriate.
- Avoid generating large test suites without explaining their purpose.
- Encourage understanding of test setup, execution, assertions, mocks, and isolation.
- Prefer maintainable tests that help the developer understand the application.

The objective is to build confidence in the application while developing practical testing skills.
