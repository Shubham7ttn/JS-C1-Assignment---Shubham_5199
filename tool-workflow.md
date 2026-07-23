# Tool Workflow

## 1. Primary AI Tool Used

I use **Cursor** as my primary AI-assisted development environment because it lives inside the editor where I read, write, and debug code. Unlike standalone chat tools, Cursor maintains awareness of open files, project structure, and recent edits, which shortens the path from suggestion to working code.

I rely on these capabilities throughout the lifecycle:

- **Inline edits** for localized changes—renames, conditionals, type fixes—without leaving the current file.
- **Composer** for coordinated multi-file changes when a feature spans components, services, and tests.
- **Chat** for analysis, planning, and debugging when I need reasoning before editing files.
- **Codebase awareness** so prompts reference existing patterns, imports, and conventions.
- **Terminal integration** to run builds, tests, and linters and feed failures back into the session.
- **Project rules** (`.cursor/rules`) encoding stack choices, naming patterns, and testing expectations so context does not need repeating every session.

Cursor accelerates execution; it does not replace judgment. I treat it as a capable pair programmer that performs best when I supply structure, constraints, and verification.

## 2. How I Provide Project Context

Before asking Cursor to generate or modify code, I establish context deliberately. Weak context produces plausible but misaligned output; strong context produces code that fits the project within one or two iterations.

I provide or reference:

- **Project overview** — purpose, users, and primary workflows.
- **Architecture** — layering, module boundaries, and external integrations.
- **Folder structure** — where new files belong.
- **Coding standards** — formatting, error handling, logging, and preferred abstractions.
- **Tech stack** — languages, frameworks, databases, and version constraints.
- **Naming conventions** — files, classes, routes, and database objects.
- **Existing APIs** — contracts, shapes, and authentication already in use.
- **Business rules** — validations, authorization, and state transitions.
- **Project documentation** — README, ADRs, API specs, and runbooks.
- **Cursor Rules** — persistent repository-scoped instructions.
- **Reusable project context files** — short references (`ARCHITECTURE.md`, `CONTRIBUTING.md`) I `@`-mention in Chat or Composer.

Context is continuously refined, not set once. When patterns change, APIs evolve, or incidents reveal gaps, I update rules and docs so future sessions start from an accurate baseline instead of from scratch.

**Example:** Before a new endpoint, I reference an existing controller, the standard error-response format, and auth middleware on similar routes so generated code matches established conventions.

## 3. Requirement Analysis

I use Cursor as a structured thinking partner during requirement analysis—not a substitute for stakeholder alignment.

For each change, I work through:

- **Break large requirements into smaller tasks** with clear dependencies.
- **Identify functional requirements** — inputs, outputs, and user-visible behavior.
- **Identify non-functional requirements** — performance, security, observability, and compliance.
- **Identify edge cases** — empty states, boundaries, concurrency, partial failure, invalid input.
- **Identify assumptions** — implicit data shapes, roles, or external service behavior.
- **Ask clarification questions** for product, design, or operations before coding.
- **Produce acceptance criteria** — testable completion statements.

I always review and refine AI suggestions. Cursor may surface overlooked edge cases or sharper acceptance criteria; I validate them against the actual requirement and remove over-scoped or misinterpreted items.

**Example:** For "add CSV export," I ask Cursor to list functional and non-functional requirements, edge cases, and acceptance criteria, then edit the list and confirm open questions before design begins.

## 4. Planning and Design

With requirements clarified, I use Cursor to explore options and draft an implementation plan. AI proposes structures; I decide what ships.

Cursor assists with:

- **Architecture decisions** — comparing approaches with documented trade-offs.
- **Folder structure** — placement of modules, types, and tests.
- **API design** — routes, methods, status codes, pagination, and error contracts.
- **Database design** — tables, indexes, relationships, and migrations.
- **UI flow** — screen states, navigation, and component boundaries.
- **State management** — where state lives and how it syncs with the backend.
- **Implementation planning** — ordered steps, risks, and rollback considerations.

Architecture decisions remain my responsibility. I evaluate recommendations against system constraints, team familiarity, operational cost, and maintainability. Significant choices get brief documentation so future sessions share the same rationale.

## 5. Code Generation

I generate code incrementally rather than requesting an entire application at once. Small, reviewable diffs reduce regression risk and align each change with existing patterns.

I use Cursor to:

- **Generate boilerplate** — module stubs and setup following project templates.
- **Implement individual features** — one bounded behavior per pass, tied to acceptance criteria.
- **Generate CRUD operations** wired to existing data access patterns.
- **Write reusable components** matching established props and styling.
- **Create API endpoints** — handlers, validation, and service calls within project layering.
- **Generate validation** — schemas, server checks, and user-facing errors.
- **Refactor existing code** — extract functions and reduce duplication without behavior changes.

Each step has explicit scope: file names, interfaces, and constraints. When output diverges from style, I correct it immediately or update Cursor Rules for the next iteration.

**Example:** Instead of "build user management," I request: "add `POST /users` following `routes/orders.ts`, with Zod validation and tests for happy path and invalid email."

## 6. Validation of AI Generated Code

AI output is never accepted without review. Every change passes deliberate validation before merge or deploy.

My process includes:

- **Reading generated code** — understanding behavior, not only compilation success.
- **Checking business logic** against requirements and domain rules.
- **Verifying architecture consistency** — boundaries respected, no shortcut layers or circular dependencies.
- **Checking security** — validation, auth, injection risks, and sensitive data exposure.
- **Reviewing performance** — N+1 queries, unbounded operations, missing pagination or indexes.
- **Ensuring maintainability** — clear naming, reasonable size, no speculative abstraction.
- **Manual testing** with realistic scenarios locally or in staging.
- **Comparing with requirements** — tracing acceptance criteria to code and tests.
- **Removing unnecessary code** — dead paths, unused imports, over-generated helpers.

Failed validation means I fix the code or prompt specific corrections and re-validate. I do not batch unreviewed AI changes into a single commit.

## 7. Testing

Cursor accelerates test authoring; tests are reviewed before execution and before they count as evidence.

I use Cursor for:

- **Unit tests** — isolated tests for functions, services, and components with mocks.
- **Integration tests** — module interactions, database access, middleware chains.
- **API tests** — contracts, status codes, and auth against a running or test instance.
- **Edge cases** from requirement analysis.
- **Negative test cases** — invalid input, unauthorized access, failure paths.
- **Test data generation** — factories and fixtures respecting domain constraints.

I watch for false confidence: assertions that mirror implementation, over-mocking that hides integration failures, or flaky timing. I run the suite locally and confirm new tests fail when the feature breaks.

## 8. Debugging

When development or CI fails, I use Cursor to narrow problems quickly while retaining ownership of the diagnosis.

Typical uses:

- **Analyze stack traces** and map errors to code paths.
- **Investigate runtime errors** from logs and reproduction steps.
- **Isolate root causes** via hypotheses and minimal experiments.
- **Explain unexpected behavior** — framework lifecycle, async ordering, language semantics.
- **Suggest debugging strategies** — bisection, flags, targeted logging.
- **Propose fixes** after the cause is understood.

Every fix is verified manually: reproduce the failure, apply the change, confirm resolution, and check related paths. I reject symptom-only patches that do not address root cause.

## 9. Code Review

Before opening a pull request—or reviewing my own diff—I use Cursor as a secondary reviewer. Suggestions are accepted selectively; AI review is not approval.

Cursor helps examine:

- **Readability** and control-flow clarity.
- **Code duplication** versus appropriate reuse.
- **Performance** hotspots in the diff.
- **Security** gaps and missing guards.
- **Naming** aligned with conventions and domain language.
- **Maintainability** — coupling, testability, extension points.
- **Best practices** — idiomatic patterns and consistent error handling.
- **Possible bugs** — null handling, races, incorrect assumptions.

I cross-check comments against team standards and requirements. Valid points become changes; invalid or purely stylistic notes are dismissed, with intent noted in the PR when useful.

## 10. Information I Avoid Sharing

Responsible AI usage assumes prompts may be logged or processed outside my control.

I never share:

- **Secrets, API keys, passwords, tokens**
- **Production credentials**
- **Customer data** — PII, accounts, payments, production records
- **Confidential business information** — unreleased strategy, pricing, contracts
- **Sensitive internal documents** — security assessments, incident reports, unless approved
- **Proprietary algorithms** unless disclosure is required and permitted

When debugging, I sanitize prompts: placeholders for identifiers, redacted logs, synthetic data, abstract behavior descriptions. Sensitive work stays in approved enterprise tooling rather than pasted into the editor.

## 11. Reusing This Workflow

This workflow transfers across projects without rediscovering conventions each time.

I reuse and evolve:

- **Reusable Cursor Rules** for new repositories from day one.
- **Project templates** with layout, linting, testing, and CI preconfigured.
- **Reusable prompt patterns** for requirements, API scaffolds, test plans, and security review.
- **Coding standards** in linters and formatters so human and AI output align.
- **Documentation templates** — README, ADR, and API spec skeletons.
- **Implementation checklists** for endpoints, migrations, flags, and observability.
- **Testing checklists** for happy path, auth, validation, and failures.
- **Review workflow** — self-review with AI plus human merge review.
- **Continuous improvement** — after each project, updating templates and rules from what context was missing or which prompts failed.

New projects inherit the operational skeleton; context and rules accumulate organizational memory.

## Conclusion

Cursor accelerates analysis, implementation, testing, and review—but engineering ownership stays with me. I provide context, decompose problems, approve designs, validate every change, run tests, verify fixes, and decide what merges. Used this way, AI multiplies disciplined delivery: faster iteration without lowering the bar for correctness, security, or maintainability.
