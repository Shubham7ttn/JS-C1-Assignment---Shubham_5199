# Test Strategy

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
