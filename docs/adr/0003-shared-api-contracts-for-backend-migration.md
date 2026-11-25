# Shared API Contracts for the Backend Migration

Date: 2026-07-01

## Status

Accepted

## Context

Authentication, session lookup, logout, and current-user lookup currently need to move from frontend-owned server actions into the Nest.js backend. If the frontend and backend each define their own endpoint strings, DTOs, and error codes, the migration can drift quickly because both sides will appear type-safe while no longer speaking the same contract.

## Decision

We will introduce a shared `packages/contracts` package as the source of truth for versioned API routes, HTTP methods, Zod request schemas, Zod response schemas, and shared error codes. The first contract scope is Identity Core: user registration, session creation, current-session lookup, logout, and current-user lookup.

## Considered Options

- Keep route constants and DTOs duplicated in frontend and backend: rejected because it preserves the current drift risk during the migration.
- Generate frontend types from backend controllers later: rejected for now because the project needs an explicit contract package before backend implementation details settle.

## Consequences

- Frontend and backend must depend on the same request and response schemas instead of local copies.
- Backend controllers should implement the contract rather than inventing endpoint shapes ad hoc.
- Contract changes become deliberate API decisions, not incidental refactors inside one app.
