# Acceptance Criteria

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
