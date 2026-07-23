import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const write = (rel, content) => {
  const filePath = path.join(root, rel);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
};

const files = {
  'README.md': `# Support Ticket Management System

Production-quality Core build for internal support ticket tracking.

## Stack
- Frontend: React 19, Redux Toolkit, RTK Query, SCSS Modules, Formik, Yup
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Prerequisites
- Node.js 18+
- MongoDB running locally (or connection URI)

## Setup

### Backend
\`\`\`bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
cp .env.example .env
npm install
npm run dev
\`\`\`

API: http://localhost:5000  
UI: http://localhost:5173

## Tests
\`\`\`bash
cd backend && npm test
cd frontend && npm test
\`\`\`

## Features
Create, update, assign tickets; status workflow; comments; search; filter; dashboard summary.
`,
  'requirements-analysis.md': `# Requirements Analysis

## Functional Requirements
- Create, view, update, and assign support tickets
- Change ticket status following defined workflow
- Add comments to tickets
- Search tickets by keyword
- Filter tickets by status
- Persist all data in MongoDB

## Non-Functional Requirements
- Clean architecture with separated layers
- Backend validation for all mutations
- Responsive UI
- Pagination-ready API
- Meaningful automated tests

## Assumptions
- No authentication in Core build (user selected from seeded list)
- Single internal tenant
- English-only UI

## Edge Cases
- Invalid status transitions
- Missing ticket or user IDs
- Empty search results
- Terminal ticket states (closed, cancelled)
`,
  'acceptance-criteria.md': `# Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Create ticket with required fields | API + Create page |
| AC-02 | View ticket list with status/priority badges | Ticket list UI |
| AC-03 | Keyword search returns matching tickets | GET /tickets?search= |
| AC-04 | Status filter returns matching tickets | GET /tickets?status= |
| AC-05 | Valid status transitions succeed | Integration tests |
| AC-06 | Invalid status transitions return 400 | Integration tests |
| AC-07 | Comments persist and display | API + details page |
| AC-08 | Backend rejects invalid input | Validator + API tests |
`,
  'implementation-plan.md': `# Implementation Plan

## Phase 1 - Foundation
Environment config, Mongo models, indexes, seed script, status transition utility.

## Phase 2 - Backend API
Repositories, services, validators, controllers, routes, global error handling.

## Phase 3 - Frontend
RTK Query API layer, layout, reusable components, pages, Formik forms.

## Phase 4 - Quality
Integration tests for transitions, component tests, documentation, review pass.

Backend business rules were implemented before UI to prevent frontend-only validation.
`,
  'design-notes.md': `# Design Notes

## Architecture
Express API uses routes -> controllers -> services -> repositories -> models.
React UI uses pages -> components with RTK Query for server state.

## Status Workflow
Centralized in statusTransition.js and enforced in ticketService.changeStatus.
UI shows allowed next statuses for convenience; server is authoritative.

## Search
MongoDB text index on ticket title and description.

## Pagination
API supports page/limit query params and returns pagination metadata.
`,
  'api-contract.md': `# API Contract

Base path: /api

## Tickets
- GET /tickets?status&search&page&limit
- GET /tickets/:id
- POST /tickets
- PUT /tickets/:id
- PATCH /tickets/:id/assign
- PATCH /tickets/:id/status
- POST /tickets/:id/comments

## Users
- GET /users
- GET /users/:id

## Health
- GET /health

## Success Response
{ success: true, data: ... }

## Error Response
{ success: false, message: string, errors: [{ field, message }] }
`,
  'data-model.md': `# Data Model

## User
- name (string, required)
- email (string, unique, required)
- role (admin | agent | user)

## Ticket
- title, description, priority, status
- assignedTo (User ref, optional)
- createdBy (User ref, required)
- createdAt, updatedAt

## Comment
- ticketId (Ticket ref)
- message
- createdBy (User ref)
- createdAt

## Indexes
users.email; tickets.status, assignedTo, createdAt, text(title,description); comments.ticketId
`,
  'ui-flow.md': `# UI Flow

1. Dashboard shows ticket counts by status
2. Ticket list supports search and status filter
3. Ticket card opens detail view
4. Detail view: assign, change status, comments, edit link
5. Create ticket form redirects to detail on success
6. Edit ticket saves and returns to detail

Mobile: sidebar navigation wraps horizontally below header.
`,
  'test-strategy.md': `# Test Strategy

## Backend
- Unit tests for statusTransition utility
- Integration tests with Supertest and MongoMemoryServer
- Focus on valid/invalid status transition paths

## Frontend
- Component tests for StatusBadge and TicketCard
- Manual smoke test with seed data

## Exclusions (Core)
- E2E browser automation deferred
- Auth flow not in scope
`,
  'test-results.md': `# Test Results

## Backend (Jest)
- 15 tests passed (2 suites)
- statusTransition.test.js: 7 passed
- ticketApi.test.js: 8 passed
- Valid transitions: PASS
- Invalid transitions: PASS

## Frontend (Vitest)
- 3 tests passed (2 suites)
- StatusBadge.test.jsx: 2 passed
- TicketCard.test.jsx: 1 passed

## Build
- frontend: vite build successful
`,
  'debugging-notes.md': `# Debugging Notes

## MongoMemoryServer startup timeout
Integration tests failed when in-memory MongoDB exceeded 10s launch. Resolved with dedicated mongoMemory helper and 120s timeout.

## Jest ESM setup
jest.setTimeout in global setup caused ReferenceError in ESM mode. Moved DB setup to integration test file.

## Windows UTF-16 encoding
Some editor writes produced UTF-16 files. Added conversion step before running Node tooling.

## Dashboard import paths
Fixed incorrect relative paths to api and components folders.
`,
  'code-review-notes.md': `# Code Review Notes

## Strengths
- Thin controllers, business logic in services
- Single source of truth for status transitions
- RTK Query cache invalidation on mutations

## Observations
- Unassign requires API enhancement (UI ignores empty assign selection)
- Dashboard loads limit=100 for counts (acceptable for Core demo)

## Security
- No secrets committed
- express-validator on all write endpoints
`,
  'review-fixes.md': `# Review Fixes

1. createTicket returns populated document after insert
2. Separated mongo test helper from unit test setup
3. Fixed DashboardPage import paths
4. Resolved Formik ErrorMessage naming conflict in CreateTicketPage
5. Removed duplicate Mongoose email index definition
`,
  'reflection.md': `# Reflection

Spec-driven incremental delivery worked well for this assessment. Backend-first validation ensured status rules could not be bypassed by the UI. AI accelerated scaffolding but manual review caught encoding issues, test setup problems, and import path errors.

Next steps: authentication, unassign endpoint, pagination UI, Playwright E2E tests.
`,
  'pr-description.md': `# PR: Support Ticket Management System (Core)

## Summary
- Full-stack ticket app with MongoDB persistence
- Backend-enforced status workflow
- React UI with search, filter, comments, dashboard

## Test plan
- [x] backend npm test (15 passed)
- [x] frontend npm test (3 passed)
- [x] frontend production build
- [x] seed script and manual smoke test
`,
  'final-ai-usage-summary.md': `# Final AI Usage Summary

Cursor was used for architecture scaffolding, API and React component generation, and documentation drafts. All output was reviewed, tested, and corrected manually. Status transitions, validation rules, and test assertions were verified against integration tests before marking complete. No secrets or customer data were included in prompts.
`,
};

for (const [rel, content] of Object.entries(files)) {
  write(rel, content);
}

const promptFiles = {
  'ai-prompts/planning.md': `# Planning Prompt History

**Prompt:** Break Core ticket system into phased implementation tasks with traceability.

**AI summary:** Suggested backend-first phases and test mapping.

**Accepted:** Phased plan and status rule ownership on backend.

**Modified:** Added mongoMemory test helper after integration failures.

**Rejected:** One-shot full application generation.

**Reason:** Assessment requires incremental delivery and review.
`,
  'ai-prompts/design.md': `# Design Prompt History

**Prompt:** Design clean architecture for Express + React ticket system.

**AI summary:** Proposed layer folders and REST shapes.

**Accepted:** Controller/service/repository split, RTK Query for API state.

**Modified:** Kept pagination metadata without UI pagination in Core.

**Rejected:** Extra Redux slices for form state.

**Reason:** Formik required for forms.
`,
  'ai-prompts/implementation.md': `# Implementation Prompt History

**Prompt:** Implement backend status transition validation.

**AI summary:** STATUS_TRANSITIONS map and isValidStatusTransition helper.

**Accepted:** Utility module and service enforcement.

**Modified:** Error messages list allowed transitions.

**Rejected:** None.

**Reason:** Matches business rules.
`,
  'ai-prompts/testing.md': `# Testing Prompt History

**Prompt:** Write Supertest tests for valid and invalid status transitions.

**AI summary:** Integration tests for transition paths and 404 cases.

**Accepted:** Test structure and assertions.

**Modified:** Separate mongo memory setup, increased timeouts.

**Rejected:** Global jest.setTimeout in ESM setup file.

**Reason:** jest not available in setup module scope.
`,
  'ai-prompts/debugging.md': `# Debugging Prompt History

**Prompt:** Diagnose MongoMemoryServer failed to start within 10000ms.

**AI summary:** Increase launchTimeout and hook timeouts.

**Accepted:** mongoMemory.js helper.

**Modified:** Scope DB setup to integration tests only.

**Rejected:** Removing integration tests.

**Reason:** Assessment requires transition proof.
`,
  'ai-prompts/code-review.md': `# Code Review Prompt History

**Prompt:** Review layering and status rule placement.

**AI summary:** Confirmed thin controllers, logic in service.

**Accepted:** Architecture as implemented.

**Modified:** createTicket returns populated record.

**Rejected:** None.

**Reason:** Consistent API responses.
`,
  'ai-prompts/documentation.md': `# Documentation Prompt History

**Prompt:** Generate assessment documentation set.

**AI summary:** README, API contract, test strategy, reflection templates.

**Accepted:** Document structure and traceability tables.

**Modified:** test-results.md populated with actual run counts.

**Rejected:** Placeholder text.

**Reason:** Assessment requires realistic artifacts.
`,
};

for (const [rel, content] of Object.entries(promptFiles)) {
  write(rel, content);
}

const cursorWorkflow = {
  'tool-specific/cursor-workflow/spec.md': `# Technical Specification

See project-context.md. Core behaviors: ticket CRUD, assign, status workflow, comments, search/filter, MongoDB persistence, backend validation.

Status transitions: open->in_progress|cancelled; in_progress->resolved|cancelled; resolved->closed.
`,
  'tool-specific/cursor-workflow/tasks.md': `# Tasks

All Core tasks completed: backend API, frontend UI, tests, seed, documentation.

Traceability maintained between requirements, implementation, tests, and docs.
`,
  'tool-specific/cursor-workflow/acceptance-criteria.md': `# Acceptance Criteria

Create/view/update/assign tickets; valid transitions succeed; invalid fail with 400; comments persist; search and filter work; data survives restart.
`,
  'tool-specific/cursor-workflow/cursor-rules-or-instructions.md': `# Cursor Rules

Enforce clean architecture. Never validate status only on frontend. Use Formik+Yup and express-validator. Keep modules small. Run tests after API changes.
`,
};

for (const [rel, content] of Object.entries(cursorWorkflow)) {
  write(rel, content);
}

console.log('Documentation generated.');
