# Requirements Analysis

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
