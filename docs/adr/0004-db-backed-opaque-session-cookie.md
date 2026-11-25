# DB-backed Opaque Session Cookie

Date: 2026-07-01

## Status

Accepted

## Context

The project needs to support both email login and PIN login while moving authentication authority into the backend. The existing browser flow already uses an `en_session` cookie, but the old model treated session state too closely as a user-field concern. The backend needs a session model that can support explicit expiration, revocation, device-bound PIN authentication, and future re-authentication rules.

## Decision

We will keep the existing `en_session` cookie name, but its value will be only an opaque random session id. The database stores only a one-way hash of that session id in a separate Session record related to the User. Session creation is modeled as `POST /api/v1/sessions`, with the login method represented inside the request body rather than as separate function-style login endpoints.

## Considered Options

- Store the active session id directly on the user record: rejected because it makes revocation, expiration, and multiple-session policy harder to express cleanly.
- Put user identity or claims inside the cookie as a JWT-like payload: rejected because the frontend should not own or interpret authentication truth.
- Split email and PIN login into `/auth/login/email` and `/auth/login/pin`: rejected because a single Session resource with a discriminated request body keeps the API resource-oriented while still preserving method-specific validation.

## Consequences

- A request is authenticated only after the backend hashes the cookie value and finds a valid, non-expired, non-revoked Session record.
- Session records can carry `auth_method` values such as `email` and `pin`, plus optional trusted-device linkage for PIN-based flows.
- The cookie name remains stable for the frontend, but its meaning changes from client-visible auth state to a backend-only lookup handle.
