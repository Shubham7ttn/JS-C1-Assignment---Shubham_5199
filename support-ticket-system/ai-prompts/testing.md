# Testing Prompt History

**Prompt:** Write Supertest tests for valid and invalid status transitions.

**AI summary:** Integration tests for transition paths and 404 cases.

**Accepted:** Test structure and assertions.

**Modified:** Separate mongo memory setup, increased timeouts.

**Rejected:** Global jest.setTimeout in ESM setup file.

**Reason:** jest not available in setup module scope.
