# Debugging Notes

## MongoMemoryServer startup timeout
Integration tests failed when in-memory MongoDB exceeded 10s launch. Resolved with dedicated mongoMemory helper and 120s timeout.

## Jest ESM setup
jest.setTimeout in global setup caused ReferenceError in ESM mode. Moved DB setup to integration test file.

## Windows UTF-16 encoding
Some editor writes produced UTF-16 files. Added conversion step before running Node tooling.

## Dashboard import paths
Fixed incorrect relative paths to api and components folders.
