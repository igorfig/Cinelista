---
applyTo: "src/**/*.ts, lib/**/*.ts"
---

# CineLista — Coding Standards

## 1. General Principles

Write code that is readable, maintainable, predictable, and consistent with the existing project.

Follow modern TypeScript and JavaScript practices while respecting the project's installed dependencies, configurations, and conventions.

Prioritize:

- Readability over cleverness.
- Explicit behavior over unnecessary abstraction.
- Strong typing without excessive verbosity.
- Reusability when there is a concrete need.
- Consistency across the codebase.
- Simple solutions proportional to the problem.

Avoid unnecessary complexity, duplicated logic, premature abstractions, and overly generic implementations.

## 2. TypeScript Guidelines

Use TypeScript consistently throughout the application.

### Type Safety

- Prefer explicit and accurate types when they improve clarity.
- Use type inference when the type is already clear from the implementation.
- Avoid `any` whenever possible.
- Prefer `unknown` when handling values whose types are not yet known.
- Narrow types before accessing properties or invoking operations.
- Avoid unnecessary type assertions.
- Do not use type assertions to bypass errors that should be properly resolved.
- Avoid non-null assertions unless the guarantee is clear and justified.

Respect the project's strict TypeScript configuration.

### Types and Interfaces

Use `type` and `interface` according to their purpose.

- Use `type` for unions, intersections, aliases, and inferred types.
- Use `interface` when defining object contracts that benefit from interface semantics or extension.
- Do not create interfaces or types without a practical reason.
- Reuse existing types when appropriate.
- Avoid duplicating types that can be inferred from Zod schemas or existing library definitions.

Prefer PascalCase for type and interface names.

### Type Inference

Do not annotate every variable or function unnecessarily.

Use inference when it produces clear and reliable types.

Add explicit return types when they improve readability, clarify public contracts, or prevent ambiguity.

## 3. Naming Conventions

Follow these naming conventions for new code:

| Element          | Convention                  | Example                |
| ---------------- | --------------------------- | ---------------------- |
| Files            | Lowercase, dot-separated    | `list.service.ts`      |
| Variables        | camelCase                   | `listId`               |
| Functions        | camelCase                   | `findListById`         |
| Classes          | PascalCase                  | `NotFoundError`        |
| Types            | PascalCase                  | `CreateListInput`      |
| Interfaces       | PascalCase                  | `ListRepository`       |
| Global constants | UPPER_SNAKE_CASE            | `OMDB_API_KEY`         |
| Tests            | `*.test.ts`                 | `list.service.test.ts` |
| Folders          | Existing project convention | `controllers/`         |

Use descriptive names that communicate intent.

Avoid ambiguous abbreviations, unnecessary prefixes, and names that do not represent the actual responsibility of the element.

Preserve existing naming conventions when modifying established code unless the task explicitly includes standardization or refactoring.

Do not rename existing exports or types merely to achieve naming consistency when doing so could affect multiple files or public contracts.

## 4. Formatting and Code Style

Follow the existing formatting conventions:

- Use double quotes for strings.
- Use semicolons.
- Use four spaces for indentation.
- Use trailing commas in multiline structures when appropriate.
- Separate logically distinct sections with blank lines.
- Keep functions and expressions reasonably concise.
- Use consistent formatting within each file.

Avoid excessive nesting and deeply chained expressions when a clearer structure is possible.

Prefer early returns when they improve readability and reduce unnecessary nesting.

Do not introduce a formatter or linter dependency without the user's approval.

## 5. Functions and Variables

Functions should have a clear and focused responsibility.

Guidelines:

- Prefer descriptive function names.
- Keep functions reasonably small.
- Avoid excessive parameters.
- Avoid hidden side effects.
- Avoid unnecessary mutable state.
- Use `const` by default.
- Use `let` only when reassignment is necessary.
- Avoid deeply nested conditional logic.
- Extract repeated logic only when doing so improves maintainability.

Do not split simple operations into multiple functions without a meaningful benefit.

## 6. Asynchronous Code

Use `async` and `await` for asynchronous operations when they improve readability.

Guidelines:

- Always handle asynchronous failures appropriately.
- Avoid unnecessary promise chaining.
- Do not leave promises unintentionally unhandled.
- Avoid sequential `await` operations when independent operations can safely execute concurrently.
- Use `Promise.all` or related utilities when parallel execution is appropriate.
- Preserve execution order when operations depend on one another.

Do not introduce concurrency where it could compromise data consistency or business behavior.

## 7. Imports and Modules

The project uses ECMAScript modules with TypeScript's `NodeNext` module configuration.

Follow the existing ESM conventions.

Guidelines:

- Use `import` and `export`.
- Use `.js` extensions in relative imports when required by the project's NodeNext configuration.
- Use `import type` for imports used exclusively as types.
- Prefer named exports when consistent with the existing module.
- Avoid unnecessary default exports.
- Keep imports organized and remove unused imports.
- Avoid circular dependencies.

Do not introduce CommonJS syntax into the existing ESM codebase.

## 8. Comments and Documentation

Write comments only when they provide meaningful context.

Comments are appropriate for:

- Non-obvious business rules.
- Important implementation decisions.
- Complex algorithms or transformations.
- Workarounds that require explanation.
- Constraints that are not evident from the code.

Avoid:

- Comments that simply repeat the code.
- Obvious or redundant explanations.
- Commented-out code that is no longer relevant.
- Excessive documentation for straightforward functions.

Prefer improving names and code structure over adding comments to explain unclear implementations.

Write comments in English, following the project's technical documentation convention.

## 9. Error Handling

Follow the existing application error-handling approach.

Guidelines:

- Reuse existing custom error classes when appropriate.
- Do not silently swallow unexpected errors.
- Avoid unnecessary `try/catch` blocks.
- Preserve useful error context.
- Do not expose internal implementation details through error messages.
- Let errors propagate to the appropriate centralized handler when applicable.

Detailed API error conventions are defined in `api.instructions.md`.

## 10. Zod and Type Inference

Use Zod as the project's input validation and schema definition library.

Guidelines:

- Infer TypeScript types from Zod schemas whenever practical.
- Avoid maintaining duplicated validation rules in separate TypeScript types.
- Reuse existing schemas when appropriate.
- Keep schema definitions readable.
- Avoid unsafe casts when working with validated data.

Follow the validation responsibilities defined in `api.instructions.md`.

## 11. Dependencies and Language Features

Use existing dependencies and native language features whenever they adequately solve the problem.

Before proposing a new dependency:

- Explain the problem it solves.
- Explain why existing tools are insufficient.
- Consider simpler alternatives.
- Wait for the user's approval.

Do not assume that a language feature, library method, or API is supported by the installed version.

Check the actual project configuration and dependency versions before using unfamiliar features.

## 12. Existing Code Compatibility

When modifying existing code:

- Preserve established behavior.
- Follow the conventions of the surrounding implementation.
- Avoid unrelated formatting changes.
- Avoid unnecessary renaming.
- Do not introduce inconsistent patterns.
- Identify meaningful technical inconsistencies when relevant.

New code should follow these standards, but existing code should only be changed when the task justifies it.

Do not perform broad standardization or refactoring without approval when it affects multiple components or contracts.

## 13. Final Quality Check

Before considering an implementation complete:

- Verify that types are correct.
- Check for unused imports and variables.
- Check for unnecessary type assertions.
- Review asynchronous operations and error propagation.
- Ensure naming and formatting are consistent.
- Confirm that the implementation follows the existing architecture.
- Run relevant checks when appropriate.

Never claim that a build, test, or validation command succeeded unless it was actually executed.
