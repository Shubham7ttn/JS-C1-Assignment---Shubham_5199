# Code Review Notes

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
