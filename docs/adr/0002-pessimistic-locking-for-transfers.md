# 2. Pessimistic Locking for Transfers

Date: 2026-06-28

## Status

Accepted

## Context

The system needs to support financial transactions (transfers) between accounts. A transfer involves deducting a balance from a sender account, adding it to a receiver account, and recording the transaction logs. Handling these operations safely in a concurrent environment is critical to avoid "Lost Updates" and negative balances.

Prisma offers atomic operations (`increment` / `decrement`), which are fast and prevent lost updates, but they do not allow the application layer to safely read the balance, validate complex business rules (e.g., overdraft limits, daily transfer limits), and then apply the update in a single safe boundary.

## Decision

We will use **Pessimistic Locking (`SELECT ... FOR UPDATE`)** orchestrating inside a dedicated `TransferService` component.

1.  **Lock Ordering**: To prevent deadlocks when concurrent transfers happen between the same accounts (A -> B and B -> A), locks must always be acquired in a consistent order (e.g., ascending order of the Account PK).
2.  **Raw Queries for Locks**: Since Prisma does not natively support `FOR UPDATE` in its standard Query API within `$transaction`, we will use `$queryRaw` to acquire the locks safely before proceeding with the Prisma Client updates.
3.  **Lean Transactions**: Only database I/O (balance checks and updates) will occur inside the transaction block. Heavy processing or external API calls must be handled outside the locked transaction scope to minimize performance bottlenecks.

## Consequences

-   **Pros**: Absolute data integrity. Business logic can confidently validate balances in memory before executing the transfer.
-   **Cons**: Increased complexity due to raw SQL queries (`$queryRaw`) and explicit lock ordering. Potential throughput reduction compared to lock-free atomic operations.
