# Design Notes

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
